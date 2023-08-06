/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 11:46:03
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 20:37:11
 * @FilePath: \ai-companion\components\user-avatar.tsx
 * @Description:
 */
"use client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
	const { user } = useUser();
	return (
		<Avatar className="h-12 w-12">
			<AvatarImage src={user?.imageUrl} />
		</Avatar>
	);
};
