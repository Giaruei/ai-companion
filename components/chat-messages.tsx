/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 14:03:45
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-05 15:00:13
 * @FilePath: \ai-companion\components\chat-messages.tsx
 * @Description:
 */
"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";

interface ChatMessagesProps {
	messages: ChatMessageProps[];
	isLoading: boolean;
	companion: Companion;
}

export const ChatMessages = ({
	messages = [],
	isLoading,
	companion,
}: ChatMessagesProps) => {
	const scrollRef = useRef<ElementRef<"div">>(null);

	const [fakeLoading, setFakeLoading] = useState(
		messages.length === 0 ? true : false
	);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setFakeLoading(false);
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	return (
		<div className="flex-1 overflow-y-auto pr-4">
			<ChatMessage
				isLoading={fakeLoading}
				src={companion.src}
				role="system"
				content={`Hello, I am ${companion.name}, ${companion.description}`}
			/>
			{messages.map((message) => (
				<ChatMessage
					key={message.content}
					role={message.role}
					content={message.content}
					src={companion.src}
				/>
			))}
			{isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
			<div ref={scrollRef} />
		</div>
	);
};
