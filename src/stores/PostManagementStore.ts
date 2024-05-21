import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IPostManagementStore {
  postApproveId: string;
  setPostApproveId: (value: string) => void;
}

const useBasePostManagementStore = create<IPostManagementStore>((set) => ({
  postApproveId: '',
  setPostApproveId: (postApproveId) => set(() => ({ postApproveId })),
}));

export const usePostManagementStore = createSelectorFunctions(useBasePostManagementStore);
