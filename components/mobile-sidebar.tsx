/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 13:51:14
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-02 13:54:37
 * @FilePath: \ai-companion\components\mobile-sidebar.tsx
 * @Description:
 */
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = ({ isPro }: { isPro: boolean }) => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
				<Sidebar isPro={isPro} />
			</SheetContent>
		</Sheet>
	);
};
