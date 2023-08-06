import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-01 19:40:41
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 14:29:29
 * @FilePath: \ai-companion\app\(root)\layout.tsx
 * @Description:
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full">
			<Navbar />
			<div className="hidden md:flex mt-16 h-full w-20 flex-col fixed inset-y-0">
				<Sidebar />
			</div>
			<main className="md:pl-20 pt-16 h-full">{children}</main>
		</div>
	);
};

export default RootLayout;
