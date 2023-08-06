/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 12:04:20
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-02 12:04:20
 * @FilePath: \ai-companion\components\theme-provider.tsx
 * @Description:
 */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
