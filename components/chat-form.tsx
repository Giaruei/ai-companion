/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 13:45:44
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 13:59:35
 * @FilePath: \ai-companion\components\chat-form.tsx
 * @Description:
 */
"use client";

import { ChangeEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps {
	input: string;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	onSubmit: (
		e: ChangeEvent<HTMLFormElement>,
		chatRequestOptions?: ChatRequestOptions | undefined
	) => void;
	isLoading: boolean;
}

export const ChatForm = ({
	input,
	handleInputChange,
	onSubmit,
	isLoading,
}: ChatFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className="border-t border-primary/10 py-4 flex items-center gap-x-2"
		>
			<Input
				disabled={isLoading}
				value={input}
				onChange={handleInputChange}
				placeholder="Type a message"
				className="rounded-lg bg-primary/10"
			/>
			<Button disabled={isLoading} variant="ghost">
				<SendHorizonal className="h-6 w-6" />
			</Button>
		</form>
	);
};
