import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-03 14:24:51
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-07 13:32:21
 * @FilePath: \ai-companion\app\api\companion\route.ts
 * @Description:
 */
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const user = await currentUser();
		const { src, name, description, instructions, seed, categoryId } = body;

		if (!user || !user.id || !user.firstName) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (
			!src ||
			!name ||
			!description ||
			!instructions ||
			!seed ||
			!categoryId
		) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const isPro = await checkSubscription();
		if (!isPro) {
			return new NextResponse("Pro subscription required", { status: 403 });
		}

		const companion = await prismadb.companion.create({
			data: {
				categoryId,
				userId: user.id,
				userName: user.firstName,
				src,
				name,
				description,
				instructions,
				seed,
			},
		});
		return NextResponse.json(companion);
	} catch (e) {
		console.log("[COMPANION_POST]", e);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
