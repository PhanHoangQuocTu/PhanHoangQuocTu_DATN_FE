import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IAdminManagementStore {
  userDeleteId: string;
  setUserDeleteId: (userDeleteId: string) => void;
}

const useBaseAdminManagementStore = create<IAdminManagementStore>((set) => ({
  userDeleteId: '',
  setUserDeleteId: (userDeleteId) => set(() => ({ userDeleteId })),
}));

export const useAdminManagementStore = createSelectorFunctions(useBaseAdminManagementStore);
