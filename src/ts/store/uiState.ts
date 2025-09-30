import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCurrencySlice, type CurrencySlice } from './currencySlice';
import type { UIState } from './types';

type UiState = UIState & CurrencySlice;

const useUiState = create<UiState>()(
  persist(
    (...a) => ({
      ...createCurrencySlice(...a),
      // Add other state and actions here
    }),
    {
      name: 'ui-state',
    }
  )
);

export default useUiState;