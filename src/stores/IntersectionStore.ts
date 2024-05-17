import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type ITargetInView = '' | 'createReview';

export interface IModalStore {
  targetInView: ITargetInView;
  setTargetInView: (target: ITargetInView) => void;
}

const useBaseIntersectionStore = create<IModalStore>((set) => ({
  targetInView: '',
  setTargetInView: (target) => set(() => ({ targetInView: target })),
}));

export const useIntersectionStore = createSelectorFunctions(useBaseIntersectionStore);
