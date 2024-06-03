import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IUserManagementStore {
  userDeleteId: string;
  userDetailId: string;
  userRestoreId: string;
  userAddRoleId: string;
  setUserDeleteId: (userDeleteId: string) => void;
  setUserDetailId: (userDetailId: string) => void;
  setUserRestoreId: (userRestoreId: string) => void;
  setUserAddRoleId: (userAddRoleId: string) => void;
}

const useBaseUserManagementStore = create<IUserManagementStore>((set) => ({
  userDeleteId: '',
  userDetailId: '',
  userRestoreId: '',
  userAddRoleId: '',
  setUserDeleteId: (userDeleteId) => set(() => ({ userDeleteId })),
  setUserDetailId: (userDetailId) => set(() => ({ userDetailId })),
  setUserRestoreId: (userRestoreId) => set(() => ({ userRestoreId })),
  setUserAddRoleId: (userAddRoleId) => set(() => ({ userAddRoleId })),
}));

export const useUserManagementStore = createSelectorFunctions(useBaseUserManagementStore);
