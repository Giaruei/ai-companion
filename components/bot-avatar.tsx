/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-04 11:46:03
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 11:47:35
 * @FilePath: \ai-companion\components\bot-avatar.tsx
 * @Description:
 */

import { Avatar, AvatarImage } from "./ui/avatar";

interface BotAvatarProps {
	src: string;
}

export const BotAvatar = ({ src }: BotAvatarProps) => {
	return <Avatar className="h-12 w-12">
    <AvatarImage src={src} />
  </Avatar>
};
