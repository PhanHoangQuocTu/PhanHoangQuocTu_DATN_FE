import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IPostStore {
  postDeleteId: string;
  postEditId: string;
  isEdit: boolean;
  isCreate: boolean;
  setPostDeleteId: (postDeleteId: string) => void;
  setPostEditId: (postEditId: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsCreate: (isCreate: boolean) => void;
  postImg: File | string | null;
  setPostImg: (postImg: File | string | null) => void;
}

const useBasePostStore = create<IPostStore>((set) => ({
  postDeleteId: '',
  postEditId: '',
  isEdit: false,
  isCreate: false,
  setPostDeleteId: (postDeleteId) => set(() => ({ postDeleteId })),
  setPostEditId: (postEditId) => set(() => ({ postEditId })),
  setIsEdit: (isEdit) => set(() => ({ isEdit })),
  setIsCreate: (isCreate) => set(() => ({ isCreate })),
  postImg: null,
  setPostImg: (postImg) => set(() => ({ postImg })),
}));

export const usePostStore = createSelectorFunctions(useBasePostStore);
