import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IPublisherManagementStore {
  publisherDeleteId: string;
  publisherEditId: string;
  isEdit: boolean;
  isCreate: boolean;
  setPublisherDeleteId: (publisherDeleteId: string) => void;
  setPublisherEditId: (publisherEditId: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsCreate: (isCreate: boolean) => void;
}

const useBasePublisherManagementStore = create<IPublisherManagementStore>((set) => ({
  publisherDeleteId: '',
  publisherEditId: '',
  isEdit: false,
  isCreate: false,
  setPublisherDeleteId: (publisherDeleteId) => set(() => ({ publisherDeleteId })),
  setPublisherEditId: (publisherEditId) => set(() => ({ publisherEditId })),
  setIsEdit: (isEdit) => set(() => ({ isEdit })),
  setIsCreate: (isCreate) => set(() => ({ isCreate })),
}));

export const usePublisherManagementStore = createSelectorFunctions(useBasePublisherManagementStore);
