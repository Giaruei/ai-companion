/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-01 19:27:04
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-01 19:27:08
 * @FilePath: \ai-companion\middleware.ts
 * @Description:
 */
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
