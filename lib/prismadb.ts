/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 15:17:14
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-02 15:20:57
 * @FilePath: \ai-companion\lib\prismadb.ts
 * @Description:
 */
import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
export default prismadb;
