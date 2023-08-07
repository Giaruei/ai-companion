/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 11:32:47
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-07 14:49:53
 * @FilePath: \ai-companion\app\(chat)\(routes)\chat\[chatId]\components\client.tsx
 * @Description:
 */
"use client";

import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";
import { ChatForm } from "@/components/chat-form";
import { ChatHeader } from "@/components/chat-header";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
	companion: Companion & {
		messages: Message[];
		_count: {
			messages: number;
		};
	};
}

export const ChatClient = ({ companion }: ChatClientProps) => {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatMessageProps[]>(
		companion.messages
	);

	const { input, isLoading, handleInputChange, handleSubmit, setInput } =
		useCompletion({
			api: `/api/chat/${companion.id}`,
			onFinish(_prompt, completion) {
				const systemMessage: ChatMessageProps = {
					role: "system",
					content: completion,
				};

				setMessages((current) => [...current, systemMessage]);
				setInput("");

				router.refresh();
			},
		});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		const userMessage: ChatMessageProps = {
			role: "user",
			content: input,
		};

		setMessages((current) => [...current, userMessage]);

		handleSubmit(e);
	};

	return (
		<div className="flex flex-col h-screen p-4 space-y-2">
			<ChatHeader companion={companion} />
			<ChatMessages
				companion={companion}
				isLoading={isLoading}
				messages={messages}
			/>
			<ChatForm
				isLoading={isLoading}
				input={input}
				handleInputChange={handleInputChange}
				onSubmit={onSubmit}
			/>
		</div>
	);
};