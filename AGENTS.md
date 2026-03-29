## Project Setup

### Context
Fresh repo with only `.gitignore` and `CLAUDE.md`. Goal is to scaffold the full tooling stack so `pnpm dev`, `pnpm build`, `pnpm test`, and `pnpm e2e` all work, and the pre-commit hook enforces type safety + linting on every commit.

---

### Files to Create

#### `package.json`
Scripts:
- `dev` → `vite`
- `build` → `vite build` (type checking is handled by `typecheck` script + pre-commit hook)
- `preview` → `vite preview`
- `typecheck` → `tsc --noEmit`
- `lint` → `eslint .`
- `lint:fix` → `eslint . --fix`
- `test` → `vitest run`
- `test:watch` → `vitest`
- `coverage` → `vitest run --coverage`
- `e2e` → `playwright test`
- `e2e:ui` → `playwright test --ui`
- `prepare` → `husky` ← Husky v9 install hook

Key deps:
- **prod**: `react`, `react-dom`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- **dev**: `vite`, `@vitejs/plugin-react`, `typescript`, `vitest`, `@vitest/coverage-v8`, `@playwright/test`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`, `husky`, `lint-staged`, `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `@eslint/js`, `globals`

#### `tsconfig.json` (root — composite, delegates to two references)
```json
{ "files": [], "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }] }
```

#### `tsconfig.app.json`
- target: ES2022, module: ESNext, moduleResolution: bundler
- strict: true, noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch
- paths: `"@/*": ["src/*"]`
- include: `["src"]`

#### `tsconfig.node.json`
- Same strict settings, target ES2022 (consistent with app; covers config files in Node.js)
- include: `["vite.config.ts", "vitest.config.ts", "playwright.config.ts"]`

#### `vite.config.ts`
- `@vitejs/plugin-react` plugin
- resolve alias: `@` → `src/`
- server port: 5173

#### `vitest.config.ts` (separate from vite.config.ts)
- environment: jsdom
- globals: true
- setupFiles: `['./src/test/setup.ts']`
- include: `src/**/*.{test,spec}.{ts,tsx}`
- coverage provider: v8

#### `eslint.config.js`
- ESLint v10 flat config
- extends: `js.configs.recommended`, `tseslint.configs.recommended`
- plugins: `react-hooks`, `react-refresh`
- ignores: dist, coverage, playwright-report

#### `playwright.config.ts`
- testDir: `./e2e`
- baseURL: `http://localhost:5173`
- webServer: auto-starts `pnpm dev`, reuses existing server locally
- projects: chromium + firefox

#### `.husky/pre-commit`
```sh
pnpm typecheck
pnpm lint
```
Must be `chmod +x`.

#### `index.html` (root)
Standard Vite HTML shell targeting `src/main.tsx`.

#### `src/main.tsx`
React 19 root with StrictMode + MUI `CssBaseline`.

#### `src/App.tsx`
Minimal placeholder component.

#### `src/test/setup.ts`
Empty for now; add `@testing-library/jest-dom` import when writing first component test.

---

### Folder Structure
```
src/
  components/      # shared reusable UI
  features/        # feature-scoped folders (components + tests co-located)
  hooks/           # custom hooks
  pages/           # route-level components
  types/           # shared TS interfaces/types
  utils/           # pure utility functions
  test/setup.ts
  App.tsx
  main.tsx
e2e/               # Playwright tests
```

---

### Setup Sequence (commands to run after files are created)
```bash
pnpm install                                              # installs deps + triggers husky setup
pnpm exec playwright install --with-deps chromium firefox
pnpm typecheck   # must pass
pnpm lint        # must pass
pnpm test        # 0 tests is OK
pnpm build       # must succeed
pnpm e2e         # smoke test
```

---

### Key Gotchas
- Husky v9: `prepare` script is just `husky` (no args). Hook files are plain shell scripts in `.husky/`.
- `@/` alias must be declared in BOTH `vite.config.ts` AND `tsconfig.app.json` paths — they must stay in sync.
- `"type": "module"` in package.json required for flat ESLint config + Vite.
- `tsconfig.node.json` must include all root-level config files (`vite.config.ts`, etc.) or `tsc -b` will error.

---

### Verification
- `pnpm dev` → app loads in browser at localhost:5173
- `pnpm build` → `dist/` produced with no TS errors
- `pnpm test` → Vitest runs (0 tests OK)
- `pnpm e2e` → Playwright connects and runs
- `git commit` → pre-commit hook fires, runs typecheck + lint
