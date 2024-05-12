import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IAuthorManagementStore {
  authorDeleteId: string;
  authorEditId: string;
  isEdit: boolean;
  isCreate: boolean;
  setAuthorDeleteId: (authorDeleteId: string) => void;
  setAuthorEditId: (authorEditId: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsCreate: (isCreate: boolean) => void;
}

const useBaseAuthorManagementStore = create<IAuthorManagementStore>((set) => ({
  authorDeleteId: '',
  authorEditId: '',
  isEdit: false,
  isCreate: false,
  setAuthorDeleteId: (authorDeleteId) => set(() => ({ authorDeleteId })),
  setAuthorEditId: (authorEditId) => set(() => ({ authorEditId })),
  setIsEdit: (isEdit) => set(() => ({ isEdit })),
  setIsCreate: (isCreate) => set(() => ({ isCreate })),
}));

export const useAuthorManagementStore = createSelectorFunctions(useBaseAuthorManagementStore);
