import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/client";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 11:23:45
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 11:45:40
 * @FilePath: \ai-companion\app\(chat)\(routes)\chat\[chatId]\page.tsx
 * @Description:
 */
interface ChatIdPageProps {
	params: {
		chatId: string;
	};
}
const ChatIdPage = async ({ params }: ChatIdPageProps) => {
	const { userId } = auth();
	if (!userId) {
		return redirectToSignIn();
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.chatId,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: "asc",
				},
				where: {
					userId,
				},
			},
			_count: {
				select: {
					messages: true,
				},
			},
		},
	});

	if (!companion) {
		return redirect("/");
	}

	return <ChatClient companion={companion} />;
};

export default ChatIdPage;
