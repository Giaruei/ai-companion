/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-02 19:46:26
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-04 12:13:22
 * @FilePath: \ai-companion\app\(root)\(routes)\companion\[companionId]\page.tsx
 * @Description:
 */
import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";
interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}
const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
	// todo check subscription

	const { userId } = auth();
	if (!userId) {
		return redirectToSignIn();
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
			userId,
		},
	});

	const categories = await prismadb.category.findMany();
	return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
