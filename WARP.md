# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo containing Next.js applications and shared packages. The project uses pnpm as the package manager and Turbo for build orchestration and caching.

## Architecture

### Monorepo Structure
- **`apps/`** - Applications
  - `web/` - Next.js application (runs on port 3000)
  - `docs/` - Next.js documentation site (runs on port 3001)
- **`packages/`** - Shared packages
  - `ui/` - Shared React component library (`@repo/ui`)
  - `eslint-config/` - Shared ESLint configurations (`@repo/eslint-config`)
  - `typescript-config/` - Shared TypeScript configurations (`@repo/typescript-config`)

### Key Technologies
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.9.2** - Type checking
- **Turborepo 2.5.6** - Monorepo build system
- **pnpm** - Package manager with workspaces
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Commands

### Development
```bash
# Start all applications in development mode
pnpm dev
# or
turbo dev

# Start a specific app
turbo dev --filter=web
turbo dev --filter=docs

# Start individual apps directly
cd apps/web && pnpm dev    # Runs on port 3000
cd apps/docs && pnpm dev   # Runs on port 3001
```

### Building
```bash
# Build all packages and apps
pnpm build
# or
turbo build

# Build a specific package/app
turbo build --filter=web
turbo build --filter=@repo/ui
```

### Linting and Type Checking
```bash
# Lint all code
pnpm lint
# or
turbo lint

# Type check all code
pnpm check-types
# or 
turbo check-types

# Format code with Prettier
pnpm format
```

### Package Management
```bash
# Install dependencies (from root)
pnpm install

# Add dependency to specific workspace
pnpm add <package> --filter=web
pnpm add -D <package> --filter=@repo/ui

# Add dependency to root workspace
pnpm add -D <package> -w
```

### Component Generation
```bash
# Generate new React component in UI package
cd packages/ui
pnpm generate:component
```

## Development Workflow

### Adding New Components
1. Components should be added to `packages/ui/src/`
2. Export new components from the appropriate files
3. Components use React 19 with TypeScript
4. Follow the existing patterns (see `button.tsx`, `card.tsx`, `code.tsx`)

### Working with Apps
- Both apps use Next.js 15 with App Router architecture
- Apps import shared components from `@repo/ui`
- Each app has its own `package.json` and can have independent dependencies
- Apps run on different ports to avoid conflicts

### Shared Configurations
- **ESLint**: Configurations are centralized in `packages/eslint-config`
  - `base.js` - Base ESLint config
  - `next.js` - Next.js specific config
  - `react-internal.js` - React component library config
- **TypeScript**: Configurations in `packages/typescript-config`
  - `base.json` - Base TypeScript config
  - `nextjs.json` - Next.js apps config
  - `react-library.json` - React libraries config

### Turbo Configuration
The `turbo.json` file defines:
- **`build`**: Builds depend on upstream builds, outputs to `.next/` (excluding cache)
- **`lint`**: Runs linting with dependency ordering
- **`check-types`**: Type checking with dependency ordering  
- **`dev`**: Development server (not cached, persistent)

## Key Files and Patterns

### Package Structure
- Each package in `packages/` exports functionality for reuse
- Apps in `apps/` consume shared packages via workspace references (`workspace:*`)
- All packages use TypeScript and follow consistent patterns

### Import Patterns
```typescript
// Importing from shared UI package
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

// ESLint config usage
// extends: ["@repo/eslint-config/next-js"]

// TypeScript config usage  
// "extends": "@repo/typescript-config/nextjs.json"
```

### Component Patterns
- Use `"use client"` directive for interactive components
- Props interfaces are clearly defined
- Components accept `className` prop for styling flexibility
- UI components are framework-agnostic (no app-specific logic)

## Testing
Currently no test framework is configured. When adding tests, consider:
- Jest or Vitest for unit testing
- Testing Library for component testing
- Playwright for e2e testing
- Add test scripts to individual package.json files and turbo.json

## Deployment
- Apps are Next.js applications suitable for Vercel deployment
- Build outputs are optimized and cached via Turbo
- Consider setting up Remote Caching for CI/CD environments
