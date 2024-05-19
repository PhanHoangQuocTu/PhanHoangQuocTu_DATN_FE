import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export interface IMyOrderStore {
  myOrderDetailId: string;
  setMyOderDetailId: (value: string) => void;
}

const useBaseMyOrderStore = create<IMyOrderStore>((set) => ({
  myOrderDetailId: '',
  setMyOderDetailId: (target) => set(() => ({ myOrderDetailId: target })),
}));

export const useMyOrderStore = createSelectorFunctions(useBaseMyOrderStore);
