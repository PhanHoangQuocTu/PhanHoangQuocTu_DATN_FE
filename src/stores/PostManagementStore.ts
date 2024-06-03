import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IPostManagementStore {
  postApproveId: string;
  postDeleteId: string;
  setPostApproveId: (value: string) => void;
  setPostDeleteId: (value: string) => void;
}

const useBasePostManagementStore = create<IPostManagementStore>((set) => ({
  postApproveId: '',
  postDeleteId: '',
  setPostApproveId: (postApproveId) => set(() => ({ postApproveId })),
  setPostDeleteId: (postDeleteId) => set(() => ({ postDeleteId })),
}));

export const usePostManagementStore = createSelectorFunctions(useBasePostManagementStore);
