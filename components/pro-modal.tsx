"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProModal = () => {
	const proModal = useProModal();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	// 防止水合
	const [isMounted, setIsmounted] = useState(false);
	useEffect(() => {
		setIsmounted(true);
	}, []);
	if (!isMounted) return null;

	const onSubscribe = async () => {
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
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader className="space-y-4">
					<DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
					<DialogDescription className="text-center space-y-2">
						Create
						<span className="mx-1 text-sky-500 font-medium">
							Custom AI
						</span>{" "}
						Companions!
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="flex justify-between">
					<p className="text-2xl font-medium">
						￥99<span className="text-sm font-normal">.99 / day</span>
					</p>
					<Button disabled={loading} onClick={onSubscribe} variant="premium">
						Subscribe
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
