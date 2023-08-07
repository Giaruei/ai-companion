/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-06 14:59:03
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-06 20:54:57
 * @FilePath: \ai-companion\app\api\stripe\route.ts
 * @Description:
 */

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingUrl = absoluteUrl("/settings");

export async function GET() {
	try {
		const { userId } = auth();
		const user = await currentUser();

		if (!user || !userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userSubscription = await prismadb.userSubscription.findUnique({
			where: {
				userId,
			},
		});

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingUrl,
			});
			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}

		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingUrl,
			cancel_url: settingUrl,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "USD",
						product_data: {
							name: "Companion Pro",
							description: "Create Custom AI Companions",
						},
						unit_amount: 9999,
						recurring: {
							interval: "day",
						},
					},
					quantity: 1,
				},
			],
			metadata: { userId },
		});
		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (e) {
		console.log("[STRIPE_GET]", e);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
