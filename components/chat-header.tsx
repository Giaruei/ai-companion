/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 11:35:22
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 12:10:22
 * @FilePath: \ai-companion\app\(chat)\(routes)\chat\[chatId]\components\chat-header.tsx
 * @Description:
 */
"use client";

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Companion, Message } from "@prisma/client";
import axios from "axios";
import {
	ChevronLeft,
	Edit,
	MessagesSquare,
	MoreVertical,
	Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
	companion: Companion & {
		messages: Message[];
		_count: {
			messages: number;
		};
	};
}

export const ChatHeader = ({ companion }: ChatHeaderProps) => {
	const router = useRouter();
	const { user } = useUser();
	const { toast } = useToast();

	const onDelete = async () => {
		try {
			await axios.delete(`/api/companion/${companion.id}`);
			toast({
				description: "Success.",
			});
      router.refresh()
      router.push('/')
		} catch (e) {
			toast({
				description: "Something went wrong.",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
			<div className="flex gap-x-2 items-center">
				<Button onClick={() => router.back()} size="icon" variant="ghost">
					<ChevronLeft className="w-8 h-8" />
				</Button>
				<BotAvatar src={companion.src} />
				<div className="flex flex-col gap-y-1">
					<div className="flex items-center gap-x-2">
						<p className="font-bold">{companion.name}</p>
						<div className="flex items-center text-xs to-muted-foreground">
							<MessagesSquare className="w-3 h-3 mr-1" />
							{companion._count.messages}
						</div>
					</div>
					<p className="text-xs text-muted-foreground">
						Created by {companion.userName}
					</p>
				</div>
			</div>
			{user?.id === companion.userId && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon">
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => router.push(`/companion/${companion.id}`)}
						>
							<Edit className="h-4 w-4 mr-2" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>
							<Trash className="h-4 w-4 mr-2" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};
