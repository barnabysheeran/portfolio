import type { StateCreator } from 'zustand';
import type { UIState } from '../../typesUIState';

export interface ThemeSlice {
    themeId: string;
    setTheme: (themeId: string) => void;
}

export const createThemeSlice: StateCreator<
    UIState & ThemeSlice,
    [],
    [],
    ThemeSlice
> = (set) => ({

    // Default Theme
    themeId: 'black',

    // Set
    setTheme: (themeId) => set({ themeId }),
});