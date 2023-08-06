/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 22:40:14
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-05 12:31:18
 * @FilePath: \ai-companion\lib\memory.ts
 * @Description:
 */
import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export type ComanionKey = {
	companionName: string;
	modelName: string;
	userId: string;
};

export class MemoryManager {
	private static instance: MemoryManager;
	private history: Redis;
	private vectorDBClient: PineconeClient;

	public constructor() {
		this.history = Redis.fromEnv();
		this.vectorDBClient = new PineconeClient();
	}

	public async init() {
		if (this.vectorDBClient instanceof PineconeClient) {
			await this.vectorDBClient.init({
				apiKey: process.env.PINECONE_API_KEY!,
				environment: process.env.PINECONE_ENVIRONMENT!,
			});
		}
	}

	public async vectorSearch(
		recentChatHistory: string,
		companionFileName: string
	) {
		const pineconeClient = <PineconeClient>this.vectorDBClient;
		const pineconeIndex = pineconeClient.Index(
			process.env.PINECONE_INDEX! || ""
		);

		const vectorStore = await PineconeStore.fromExistingIndex(
			new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
			{ pineconeIndex }
		);

		const similarDocs = await vectorStore
			.similaritySearch(recentChatHistory, 3, { fileName: companionFileName })
			.catch((e) => {
				console.log("Failed to get vector search resultes", e);
			});

		return similarDocs;
	}

	public static async getInstance(): Promise<MemoryManager> {
		if (!MemoryManager.instance) {
			MemoryManager.instance = new MemoryManager();
			await MemoryManager.instance.init();
		}

		return MemoryManager.instance;
	}

	public generateRedisCompanionKey(companionKey: ComanionKey): string {
		return `${companionKey.companionName}-${companionKey.modelName}-${companionKey.userId}`;
	}

	public async writeToHistory(text: string, companionKey: ComanionKey) {
		if (!companionKey || typeof companionKey.userId == "undefined") {
			console.log("Companion key set incorrectly");
			return "";
		}
		const key = this.generateRedisCompanionKey(companionKey);
		const result = await this.history.zadd(key, {
			score: Date.now(),
			member: text,
		});
		return result;
	}

	public async readLatestHistory(companionKey: ComanionKey): Promise<string> {
		if (!companionKey || typeof companionKey.userId == "undefined") {
			console.log("Companion key set incorrectly");
			return "";
		}

		const key = this.generateRedisCompanionKey(companionKey);
		let result = await this.history.zrange(key, 0, Date.now(), {
			byScore: true,
		});

		result = result.slice(-30).reverse();
		const recentChats = result.reverse().join("\n");
		return recentChats;
	}

	public async seedChatHistory(
		seedContent: string,
		delimiter: string = "\n",
		companionKey: ComanionKey
	) {
		const key = this.generateRedisCompanionKey(companionKey);

		if (await this.history.exists(key)) {
			console.log("User already has chat history");
			return;
		}

		const content = seedContent.split(delimiter);
		let counter = 0;

		for (let line of content) {
			await this.history.zadd(key, { score: counter, member: line });
			counter += 1;
		}
	}
}
