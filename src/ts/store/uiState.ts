import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  createCurrencySlice,
  type CurrencySlice,
} from './ui/slice/currencySlice';
import { createThemeSlice, type ThemeSlice } from './ui/slice/themeSlice';

import type { UIState } from './typesUIState';

type StoreState = UIState & CurrencySlice & ThemeSlice;

const useUiState = create<StoreState>()(
  persist(
    (...a) => {
      return {
        ...createCurrencySlice(...a),
        ...createThemeSlice(...a),
      };
    },
    {
      name: 'ui-state',
    },
  ),
);

export default useUiState;
