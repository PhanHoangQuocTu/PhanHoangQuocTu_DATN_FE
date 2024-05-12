import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface ICategoryManagementStore {
  categoryDeleteId: string;
  categoryEditId: string;
  isEdit: boolean;
  isCreate: boolean;
  setCategoryDeleteId: (categoryDeleteId: string) => void;
  setCategoryEditId: (categoryEditId: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsCreate: (isCreate: boolean) => void;
}

const useBaseCategoryManagementStore = create<ICategoryManagementStore>((set) => ({
  categoryDeleteId: '',
  categoryEditId: '',
  isEdit: false,
  isCreate: false,
  setCategoryDeleteId: (categoryDeleteId) => set(() => ({ categoryDeleteId })),
  setCategoryEditId: (categoryEditId) => set(() => ({ categoryEditId })),
  setIsEdit: (isEdit) => set(() => ({ isEdit })),
  setIsCreate: (isCreate) => set(() => ({ isCreate })),
}));

export const useCategoryManagementStore = createSelectorFunctions(useBaseCategoryManagementStore);
