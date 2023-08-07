/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-07 13:35:12
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-07 13:42:47
 * @FilePath: \ai-companion\app\(root)\(routes)\settings\page.tsx
 * @Description:
 */

import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingPage = async () => {
	const isPro = await checkSubscription();

	return (
		<div className="h-full p-4 space-y-2">
			<h3 className="text-lg font-medium">Settings</h3>
			<div className="text-muted-foreground text-sm">
				{isPro
					? "You are currently on a Pro plan."
					: "You are currently on a free plan."}
			</div>
      <SubscriptionButton isPro={isPro} />
		</div>
	);
};

export default SettingPage;
