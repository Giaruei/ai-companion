/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-01 19:34:50
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-01 19:36:12
 * @FilePath: \ai-companion\app\(auth)\layout.tsx
 * @Description:
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex items-center justify-center h-full">{children}</div>
	);
};

export default AuthLayout;
