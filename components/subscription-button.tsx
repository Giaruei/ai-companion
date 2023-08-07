/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-07 13:39:10
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-07 13:43:29
 * @FilePath: \ai-companion\components\subscription-button.tsx
 * @Description:
 */
"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface SubscriptionButtonProps {
	isPro: boolean;
}

export const SubscriptionButton = ({
	isPro = false,
}: SubscriptionButtonProps) => {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const onClick = async () => {
		try {
			setLoading(true);

			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (e) {
			toast({
				variant: "destructive",
				description: "Something went wrong",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<Button
			onClick={onClick}
			disabled={loading}
			size="sm"
			variant={isPro ? "default" : "premium"}
		>
			{isPro ? "Manage Subscription" : "Upgrade"}
			{!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
		</Button>
	);
};
