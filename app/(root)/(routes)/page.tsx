/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-01 14:32:56
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-03 19:58:06
 * @FilePath: \ai-companion\app\(root)\(routes)\page.tsx
 * @Description:
 */

import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
	searchParams: {
		categoryId: string;
		name: string;
	};
}

const RootPage = async ({ searchParams }: RootPageProps) => {
	const data = await prismadb.companion.findMany({
		where: {
			categoryId: searchParams.categoryId,
			name: {
				search: searchParams.name,
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			_count: {
				select: {
					messages: true,
				},
			},
		},
	});

	const categories = await prismadb.category.findMany();
	return (
		<div className="h-full p-4 space-y-2">
			<SearchInput />
			<Categories data={categories} />
			<Companions data={data} />
		</div>
	);
};

export default RootPage;
