# CoRoam (landing)

Vite + React marketing site for [coroam.io](https://coroam.io). Supabase **migrations and Edge Functions** live in **Stride-Sync** — not in this repo. See `supabase-schema.sql` for an illustrative schema summary only.

### Waitlist email logo (`send-invite`)

The Stride-Sync Edge Function `send-invite` reads **`WAITLIST_EMAIL_LOGO_URL`**: a public **HTTPS** URL to a PNG (see Stride-Sync `supabase/functions/README.md`).

This site serves the design wordmark at **`/coroam-wordmark.png`** (from Stride-Sync `assets/coroam-wordmark.png`). After you deploy the landing site, set:

```bash
supabase secrets set WAITLIST_EMAIL_LOGO_URL="https://coroam.io/coroam-wordmark.png"
```

Use your real production domain if different. Optionally set **`WAITLIST_EMAIL_SUBJECT`**, then redeploy the function from Stride-Sync (`supabase functions deploy send-invite`). When the wordmark changes in Stride-Sync, copy `assets/coroam-wordmark.png` into `public/coroam-wordmark.png` here and redeploy the site.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
