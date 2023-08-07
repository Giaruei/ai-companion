/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-01 19:43:05
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-07 13:26:46
 * @FilePath: \ai-companion\components\navbar.tsx
 * @Description:
 */
"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkle } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { MobileSidebar } from "./mobile-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({
	weight: "600",
	subsets: ["latin"],
});

interface NavbarProps {
	isPro: boolean;
}

export const Navbar = ({ isPro }: NavbarProps) => {
	const proModal = useProModal();
	return (
		<div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
			<div className="flex items-center">
				<MobileSidebar />
				<Link href="/">
					<h1
						className={cn(
							"hidden md:block text-xl md:text-3xl font-bold text-primary",
							font.className
						)}
					>
						companion.ai
					</h1>
				</Link>
			</div>
			<div className="flex items-center gap-x-3">
				{!isPro && (
					<Button onClick={proModal.onOpen} variant="premium">
						Upgrade
						<Sparkle className="h-4 w-4 fill-white text-white" />
					</Button>
				)}
				<ModeToggle />
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};
