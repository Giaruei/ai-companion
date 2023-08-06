/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-03 19:59:32
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 00:44:19
 * @FilePath: \ai-companion\components\companions.tsx
 * @Description:
 */
import Link from "next/link";
import Image from "next/image";
import { Companion } from "@prisma/client";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { MessageSquare } from "lucide-react";

interface CompanionsProps {
	data: (Companion & {
		_count: {
			messages: number;
		};
	})[];
}
export const Companions = ({ data }: CompanionsProps) => {
	if (data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center pt-10 space-y-3">
				<div className="w-60 h-60 relative">
					<Image fill className="grayscale" alt="Empty" src="/empty.png" />
				</div>
				<p className="text-sm text-muted-foreground">No companions found.</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
			{data.map((item) => (
				<Card
					key={item.id}
					className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
				>
					<Link href={`/chat/${item.id}`}>
						<CardHeader className="flex items-center justify-center text-center text-muted-foreground">
							<div className="relative w-32 h-32">
								<Image
									src={item.src}
									className="rounded-xl object-cover"
									alt="Companion"
									fill
								/>
							</div>
							<p className="font-bold">{item.name}</p>
							<p className="text-xs">{item.description}</p>
						</CardHeader>
						<CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
							<p className="lowercase">@{item.userName}</p>
							<div className="flex items-center">
								<MessageSquare className="w-3 h-3 mr-1" />
								{item._count.messages}
							</div>
						</CardFooter>
					</Link>
				</Card>
			))}
		</div>
	);
};
