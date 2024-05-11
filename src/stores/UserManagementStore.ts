import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IUserManagementStore {
  userDeleteId: string;
  setUserDeleteId: (userDeleteId: string) => void;
}

const useBaseUserManagementStore = create<IUserManagementStore>((set) => ({
  userDeleteId: '',
  setUserDeleteId: (userDeleteId) => set(() => ({ userDeleteId })),
}));

export const useUserManagementStore = createSelectorFunctions(useBaseUserManagementStore);
