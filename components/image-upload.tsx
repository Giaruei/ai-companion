/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 20:42:40
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-02 21:04:42
 * @FilePath: \ai-companion\components\image-upload.tsx
 * @Description:
 */
"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
	value: string;
	onChange: (src: string) => void;
	disabled?: boolean;
}

export const ImageUpload = ({
	value,
	onChange,
	disabled,
}: ImageUploadProps) => {
	// 防止水合
	const [isMounted, setIsmounted] = useState(false);
	useEffect(() => {
		setIsmounted(true);
	}, []);
	if (!isMounted) return null;

	return (
		<div className="space-y-4 w-full flex flex-col justify-center items-center">
			<CldUploadButton
				onUpload={(result: any) => onChange(result.info.secure_url)}
				options={{
					maxFiles: 1,
				}}
				uploadPreset="agtjmvxt"
			>
				<div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
					<div className="relative h-40 w-40">
						<Image
							fill
							alt="Upload"
							src={value || "/placeholder.svg"}
							className="rounded-lg object-cover"
						/>
					</div>
				</div>
			</CldUploadButton>
		</div>
	);
};
