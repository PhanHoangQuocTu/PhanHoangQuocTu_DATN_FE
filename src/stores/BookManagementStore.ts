import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IBookManagementStore {
  bookDeleteId: string;
  bookEditId: string;
  isEdit: boolean;
  isCreate: boolean;
  setBookDeleteId: (bookDeleteId: string) => void;
  setBookEditId: (bookEditId: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsCreate: (isCreate: boolean) => void;
  productImg: File | string | null;
  setProductImg: (productImg: File | string | null) => void;
}

const useBaseBookManagementStore = create<IBookManagementStore>((set) => ({
  bookDeleteId: '',
  bookEditId: '',
  isEdit: false,
  isCreate: false,
  setBookDeleteId: (bookDeleteId) => set(() => ({ bookDeleteId })),
  setBookEditId: (bookEditId) => set(() => ({ bookEditId })),
  setIsEdit: (isEdit) => set(() => ({ isEdit })),
  setIsCreate: (isCreate) => set(() => ({ isCreate })),
  productImg: null,
  setProductImg: (productImg) => set(() => ({ productImg })),
}));

export const useBookManagementStore = createSelectorFunctions(useBaseBookManagementStore);
