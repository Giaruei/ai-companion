/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-05 13:51:11
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-05 13:53:41
 * @FilePath: \ai-companion\lib\rate-limit.ts
 * @Description:
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function rateLimit(identifier: string) {
	const rateLimit = new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(10, "10 s"),
		analytics: true,
		prefix: "@upstash/ratelimit",
	});
	return await rateLimit.limit(identifier);
}
