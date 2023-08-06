/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 14:23:38
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-02 14:34:49
 * @FilePath: \ai-companion\hooks\use-debounce.ts
 * @Description:
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
	const [debounceValue, setDebounceValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebounceValue(value), delay || 500);
		return () => {
			clearTimeout(timer);
		};
	}, [delay, value]);

	return debounceValue;
}
