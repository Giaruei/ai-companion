/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 15:21:53
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-02 15:26:40
 * @FilePath: \ai-companion\scripts\seed.ts
 * @Description:
 */
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
	try {
		await db.category.createMany({
			data: [
				{ name: "Famous People" },
				{ name: "Movies & TV" },
				{ name: "Musicians" },
				{ name: "Games" },
				{ name: "Animals" },
				{ name: "Philosophy" },
				{ name: "Scientists" },
			],
		});
	} catch (error) {
		console.error("Error seeding default categories:", error);
	} finally {
		await db.$disconnect();
	}
}

main();
