import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IOrderManagementStore {
  orderDetailId: string;
  setOderDetailId: (value: string) => void;
}

const useBaseOrderManagementStore = create<IOrderManagementStore>((set) => ({
  orderDetailId: '',
  setOderDetailId: (target) => set(() => ({ orderDetailId: target })),
}));

export const useOrderManagementStore = createSelectorFunctions(useBaseOrderManagementStore);
