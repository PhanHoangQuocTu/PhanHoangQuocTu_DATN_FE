import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IUserManagementStore {
  userDeleteId: string;
  userDetailId: string;
  userRestoreId: string;
  setUserDeleteId: (userDeleteId: string) => void;
  setUserDetailId: (userDetailId: string) => void;
  setUserRestoreId: (userRestoreId: string) => void;
}

const useBaseUserManagementStore = create<IUserManagementStore>((set) => ({
  userDeleteId: '',
  userDetailId: '',
  userRestoreId: '',
  setUserDeleteId: (userDeleteId) => set(() => ({ userDeleteId })),
  setUserDetailId: (userDetailId) => set(() => ({ userDetailId })),
  setUserRestoreId: (userRestoreId) => set(() => ({ userRestoreId })),
}));

export const useUserManagementStore = createSelectorFunctions(useBaseUserManagementStore);
