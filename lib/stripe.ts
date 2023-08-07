/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-06 14:42:35
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-06 14:43:47
 * @FilePath: \ai-companion\lib\stripe.ts
 * @Description:
 */
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
	apiVersion: "2022-11-15",
	typescript: true,
});
