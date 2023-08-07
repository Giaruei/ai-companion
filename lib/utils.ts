/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-01 14:01:12
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-06 15:06:36
 * @FilePath: \ai-companion\lib\utils.ts
 * @Description:
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

absoluteUrl("/settings")