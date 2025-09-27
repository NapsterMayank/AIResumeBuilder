React Developer Guidelines (Vite)

This document defines how this React (Vite) application should be developed.
GitHub Copilot (and developers) should follow these rules to generate consistent, scalable, and maintainable code.

1. Architecture

Use Component-Based Architecture with Clean Code principles.

Follow Separation of Concerns → UI, state, and data logic should not mix.

Keep dumb (presentational) and smart (container) components separated.

Layers:

UI Components

Stateless, reusable building blocks (Button, Card, Input).

Handle only presentation.

Pages

Combine multiple components.

Define page-level composition.

Should not contain API calls or complex logic.

Hooks (Custom Hooks)

Encapsulate stateful logic.

Handle data fetching, form handling, and side effects.

Services

Contain API calls (REST/GraphQL).

Must include error handling and response normalization.

Context / Store

Manage global state.

Use React Context, Zustand, or Redux Toolkit (depending on project scale).

2. Folder Structure

Organize code as follows:

src/
├── components/ → Reusable UI components
│ ├── ui/ → Buttons, Inputs, Modals
│ └── common/ → Headers, Footers, Navbars
│
├── pages/ → Page-level components (Home, Login, Dashboard)
│ └── Home.tsx
│
├── hooks/ → Custom React hooks
│ ├── useAuth.ts
│ └── useFetch.ts
│
├── services/ → API calls, business logic
│ ├── authService.ts
│ └── productService.ts
│
├── context/ → Context providers or Zustand/Redux stores
│ ├── AuthContext.tsx
│ └── ThemeContext.tsx
│
├── models/ → TypeScript types & interfaces
│ ├── User.ts
│ └── Product.ts
│
├── utils/ → Helper functions (date, format, validators)
│ ├── formatDate.ts
│ └── validators.ts
│
├── styles/ → Global styles, Tailwind config, theme
│ └── globals.css
│
└── config/ → App configuration, environment setup
└── apiConfig.ts

3. Naming Conventions

Components → UserCard.tsx, LoginForm.tsx

Pages → Home.tsx, Login.tsx

Hooks → useAuth.ts, useProducts.ts

Services → authService.ts, productService.ts

Context → AuthContext.tsx, ThemeProvider.tsx

Models → User.ts, Product.ts

Utility Functions → formatDate.ts, parseJwt.ts

Variables and functions must be descriptive and intention-revealing.
❌ Avoid: data, obj, temp.
✅ Use: userList, isAuthenticated, fetchProducts.

4. File & Function Size

Component file length: Max ~300 lines.

Function length: Max 30–40 lines (split into helpers if needed).

Hooks/Services: Max ~150 lines.

Never allow “God components” (e.g., 500-line pages).

5. React Principles

Use functional components with hooks (no class components).

Components should be pure and reusable.

Use TypeScript for type safety.

Props should always be typed.

Favor composition over inheritance.

6. Styling

Use TailwindCSS (preferred) or styled-components.

Follow Atomic Design principles for UI components.

No inline styles unless absolutely necessary.

7. Libraries & Tools

Axios / Fetch API → Networking

React Query (TanStack Query) → Data fetching & caching

Zustand / Redux Toolkit → State management (if needed)

Zod / Yup → Validation

Framer Motion → Animations

React Router v6 → Routing

ESLint + Prettier → Code formatting & linting

Jest + React Testing Library → Unit testing

Vitest → Fast test runner for Vite

8. UI Rules

Components:

Should be stateless unless local UI state is required.

Must be reusable and composable.

Pages:

Only for composition of components.

Hooks:

Extract logic out of components.

Prefix with use.

9. Testing

Unit Tests for:

Hooks

Services

Utilities

Component Tests:

Use React Testing Library.

Integration/E2E:

Use Cypress / Playwright.

Test naming convention:

functionName_condition_expectedResult()

Example:
loginUser_withValidCredentials_returnsSuccess()

10. Scalability & Maintainability

Code as if app will scale to millions of users.

Strictly enforce separation of concerns.

Models should be immutable.

Always handle:

Loading states

Error states

Empty states

11. Avoid Anti-Patterns

❌ Don’t put API calls inside components.
❌ Don’t use any in TypeScript.
❌ Don’t create “God Components.”
❌ Don’t hardcode strings → use localization or constants.
❌ Don’t duplicate code → extract helpers/hooks.

12. Example Copilot Hints

Copilot should prefer this style when suggesting code:

Use functional components with hooks.

Suggest custom hooks for logic.

Use React Query for API fetching.

Suggest TypeScript interfaces for models.

Use context/store for shared state instead of prop-drilling.

Split large components into smaller ones.
