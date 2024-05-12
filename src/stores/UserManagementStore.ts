import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IUserManagementStore {
  userDeleteId: string;
  userDetailId: string;
  setUserDeleteId: (userDeleteId: string) => void;
  setUserDetailId: (userDetailId: string) => void;
}

const useBaseUserManagementStore = create<IUserManagementStore>((set) => ({
  userDeleteId: '',
  userDetailId: '',
  setUserDeleteId: (userDeleteId) => set(() => ({ userDeleteId })),
  setUserDetailId: (userDetailId) => set(() => ({ userDetailId })),
}));

export const useUserManagementStore = createSelectorFunctions(useBaseUserManagementStore);
