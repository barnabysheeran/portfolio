// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

const reactHooksConfig = reactHooks.configs['recommended-latest']
const reactRefreshConfig = reactRefresh.configs.vite
const jsPreset = js.configs.recommended
const tsPresets = tseslint.configs.recommended

export default [globalIgnores(['dist']), {
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
  },
}, ...(Array.isArray(jsPreset) ? jsPreset : [jsPreset]), ...(Array.isArray(tsPresets) ? tsPresets : [tsPresets]), {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...(reactHooksConfig.rules ?? {}),
    ...(reactRefreshConfig.rules ?? {}),
  },
}, ...storybook.configs["flat/recommended"]];
