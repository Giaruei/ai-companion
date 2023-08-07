/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-08-06 20:28:24
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-08-06 20:29:55
 * @FilePath: \ai-companion\hooks\use-pro-modal.ts
 * @Description:
 */
import { create } from "zustand";

interface useProModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
