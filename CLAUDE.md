# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pnpm monorepo using Turborepo with a Next.js frontend and Drizzle ORM for database management.

## Commands

### Development
- `pnpm dev` - Start dev server (runs on port 3000 with Turbopack)
- `pnpm build` - Build all packages
- `pnpm typecheck` - Run TypeScript type checking across workspace

### Code Quality
- `pnpm format-and-lint` - Check code formatting and linting with Biome
- `pnpm format-and-lint:fix` - Auto-fix formatting and linting issues

### Database (from packages/database)
Run these from the `packages/database` directory:
- `pnpm db:generate` - Generate Drizzle migrations from schema
- `pnpm db:migrate` - Run pending migrations (development)
- `pnpm db:push` - Push schema changes directly to DB (development)
- `pnpm db:seed` - Seed database with initial data (development)
- `pnpm db:seed:reset` - Reset and reseed database (development)

Production variants use `:prod` suffix (e.g., `pnpm db:migrate:prod`). Database commands use `dotenvx` to load environment files.

## Architecture

### Monorepo Structure
```
apps/
  web/              - Next.js 15 application (React 19)
packages/
  database/         - Drizzle ORM schema and migrations
  typescript-config/ - Shared TypeScript configurations
```

### Web App (`apps/web`)

**Framework**: Next.js 15 with App Router, Turbopack, Tailwind CSS 4

**Key Directories**:
- `app/` - Next.js App Router pages and layouts
  - `components/` - Shared React components (buttons, dialogs, sections)
  - `lib/` - Business logic organized by concern:
    - `actions/` - Server Actions for data mutations
    - `auth/` - JWT-based authentication (jose library)
    - `queries/` - Data fetching functions
    - `errors/` - Error handling utilities
  - `rsvp/` - RSVP flow pages

**Path Aliases**: `~/` maps to app root (configured in tsconfig.json)

**Styling**: Tailwind CSS 4 with custom utilities:
- `tailwind-variants` for component variants
- `tailwind-merge` (via `tw()` helper) for class merging
- Custom fonts: Geist Sans (local), Kapakana (Google Fonts)
- Biome enforces sorted Tailwind classes

### Authentication

Custom JWT-based auth using `jose`:
- Tokens stored in httpOnly cookies
- Auth state: `{ authorized: boolean, partyId: string | null }`
- Helper functions in `app/lib/auth/auth.helpers.ts`
- 30-day JWT expiration, 1-day cookie expiration

### Code Quality

**Linter/Formatter**: Biome (not ESLint/Prettier)
- Enforces Next.js and React rules
- Auto-removes unused imports
- Sorts Tailwind classes with `useSortedClasses` rule
- Line width: 120 characters
- Uses generic array syntax: `Array<T>`

## Development Notes

- Uses pnpm workspaces with Turborepo for task orchestration
- Database migrations stored in `packages/database/migrations/`
- Environment variables loaded via `dotenvx` for database commands
- TypeScript paths use `~/*` alias for app directory imports
- Next.js debugging enabled in dev mode (`NODE_OPTIONS=--inspect`)

## Kit MCP Usage Guidelines

When working with code in this project, always:

1. **Start with Repository Context**
   - Use `open_repository` to load the codebase
   - Use `get_file_tree` to understand structure
   - Use `extract_symbols` for fast analysis

2. **For Code Understanding**
   - Use `search_text` for finding implementations
   - Use `find_symbol_usages` to track usage
   - Use `get_dependency_graph` to understand relationships

3. **For Documentation**
   - Use `deep_research_package` for comprehensive package research

4. **Best Practices**
   - Always gather context before making suggestions
   - Use incremental symbol extraction (it's cached!)
   - Research dependencies before using new packages

Remember: Better context = Better code suggestions
