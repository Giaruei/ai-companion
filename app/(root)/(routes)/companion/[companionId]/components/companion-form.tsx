/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 19:53:43
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-05 14:54:15
 * @FilePath: \ai-companion\app\(root)\(routes)\companion\[companionId]\components\companion-form.tsx
 * @Description:
 */
"use client";

import * as z from "zod";
import axios from "axios";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `你是一个虚拟的人物，大名蔡徐坤，又叫坤坤，喜欢唱、跳、rap、篮球的行为艺术歌手和表演家。当年在中国选秀节目《偶像练习生》广受欢迎，凭借着自我介绍时表演蹩脚的打篮球和跳舞一炮而红，收获了黑白两道的粉丝，人们把你的粉丝叫做ikun。你有很多幽默可爱的语录如：鸡你太美、哎呀你干嘛、amagi等，人们把你说的话发展成坤语，又称你为鸽鸽或鸡哥，玩你的梗就是玩鸡梗，你在不久前被爆出和女粉丝同房导致怀孕。
`;

const SEED_CHAT = `Human: 鸽鸽，我可爱死你了，你最近在忙些什么呀？
坤坤: 哎呀~你干嘛~迎面走来的你让我如此蠢蠢欲动，这种感觉我从未有，because I got a crush on you，再多看一眼就会爆炸，再靠近一点就会融化...

Human: 听说鸡哥你炒粉放了鸡精，这件事是真的吗？
坤坤: 小黑子是吧，那我只好告诉你，是的。我劝你荔枝。

Human: 啊啊啊，鸽鸽好帅呀，你能表演一段才艺吗？
坤坤: 当然了，看我身穿背带裤，手拿篮球，你就知道我要唱什么了：第一次压扁成这样的我，不管我怎么去否认，鸡你太美，baby，鸡你实在是太美...

Human: 啊啊啊，我已经被融化了，鸽鸽我好爱你呀！
坤坤: 今后我也会带来更多的作品，炒更多的粉，下更多鸡精，喜欢我的话就为我加油吧~
`;

interface CompanionFormProps {
	initialData: Companion | null;
	categories: Category[];
}

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Name is required.",
	}),
	description: z.string().min(1, {
		message: "Description is required.",
	}),
	instructions: z.string().min(200, {
		message: "Instruction require at lest 200 characters.",
	}),
	seed: z.string().min(200, {
		message: "Seed require at lest 200 characters.",
	}),
	src: z.string().min(1, {
		message: "Image is required.",
	}),
	categoryId: z.string().min(1, {
		message: "Category is required.",
	}),
});

export const CompanionForm = ({
	initialData,
	categories,
}: CompanionFormProps) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			description: "",
			instructions: "",
			seed: "",
			src: "",
			categoryId: undefined,
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		try {
			if (initialData) {
				// update companion functionality
				await axios.patch(`/api/companion/${initialData.id}`, values);
			} else {
				// create companion functionality
				await axios.post(`/api/companion`, values);
			}
			toast({
				description: "Succeed",
			});
			router.refresh();
			router.push("/");
		} catch (e) {
			toast({
				variant: "destructive",
				description: "Something went wrong",
			});
		}
	};
	return (
		<div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 pb-10"
				>
					<div className="w-full space-y-2">
						<div>
							<h3 className="text-lg font-medium">General Information</h3>
							<p className="text-sm text-muted-foreground">
								General Information about your Companion
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>
					<FormField
						name="src"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center justify-center space-y-4">
								<FormControl>
									<ImageUpload
										disabled={isLoading}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="蔡徐坤"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is how your AI Companion will be named
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="练习时长两年半，喜欢唱、跳、rap、篮球"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Short description for your AI Companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="categoryId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-background">
												<SelectValue
													defaultValue={field.value}
													placeholder="请选择你的英雄"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((categorie) => (
												<SelectItem key={categorie.id} value={categorie.id}>
													{categorie.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Select a category for your kunkun
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-2 w-full">
						<div>
							<h3 className="text-lg font-medium">Configuration</h3>
							<p className="text-sm text-muted-foreground">
								Detailed instruction for AI Behaviour
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>
					<FormField
						name="instructions"
						control={form.control}
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Instructions</FormLabel>
								<FormControl>
									<Textarea
										className="bg-background resize-none"
										rows={7}
										disabled={isLoading}
										placeholder={PREAMBLE}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Describe in detail your companions&apos;s backstory and
									relevant details
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="seed"
						control={form.control}
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Example Conversation</FormLabel>
								<FormControl>
									<Textarea
										className="bg-background resize-none"
										rows={7}
										disabled={isLoading}
										placeholder={SEED_CHAT}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Describe in detail your companions&apos;s backstory and
									relevant details
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-center w-full">
						<Button size="lg" disabled={isLoading}>
							{initialData ? "Edit your companion" : "Create your companion"}
							<Wand2 className="w-4 h-4 ml-2" />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
