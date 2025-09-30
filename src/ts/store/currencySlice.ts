import type { StateCreator } from 'zustand';
import type { UIState } from './types';

export interface CurrencySlice {
  credits: number;
  addCredits: (amount: number) => void;
  subtractCredits: (amount: number) => void;
}

export const createCurrencySlice: StateCreator<
  UIState & CurrencySlice,
  [],
  [],
  CurrencySlice
> = (set) => ({
  credits: 0,

  addCredits: (amount) => set((state: UIState & CurrencySlice) => ({ credits: state.credits + amount })),
  
  subtractCredits: (amount) => set((state: UIState & CurrencySlice) => ({ credits: Math.max(0, state.credits - amount) })),
});