# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright + TypeScript end-to-end test suite for the Sauce Demo e-commerce app (https://www.saucedemo.com/). Tests cover login, inventory browsing, cart operations, sorting, navigation, and edge cases.

## Commands

```bash
# Install dependencies
yarn install
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run a single test file
npx playwright test tests/login.spec.ts
npx playwright test tests/inventory/sorting.spec.ts

# Run tests matching a name pattern
npx playwright test -g "Sort products by name"

# Run a specific directory
npx playwright test tests/inventory

# Run on a specific browser
npx playwright test --project=chromium

# Debug / headed / UI mode
npx playwright test --debug
npx playwright test --headed
npx playwright test --ui

# View HTML report
npx playwright show-report

# Lint
npx eslint .
```

## Architecture

### Page Object Model (POM)

- **Page objects** live in `pages/` (PascalCase: `Login.ts`). Each class takes a Playwright `Page` in its constructor and exposes locators as `readonly` properties and actions as async methods.
- **Test specs** live in `tests/` (lowercase: `login.spec.ts`). Feature-specific suites go in subdirectories (e.g., `tests/inventory/`).
- **Test data** lives in `data/` as JSON files (e.g., `loginData.json`). Import data rather than hardcoding values.

### Test Structure Conventions

Tests follow a strict pattern documented in `tests/TEST_STRUCTURE_PATTERN.md`:

1. Wrap related tests in `test.describe("Feature/Scenario Group", () => { ... })`
2. Use `test.step("description", async () => { ... })` to organize actions within each test
3. Follow Arrange-Act-Assert pattern
4. Prefer `[data-test="..."]` locators, then `getByRole()`, then `getByLabel()`

### Inventory Tests Pattern

Tests in `tests/inventory/` were generated from `tests/inventory.plan.md` using `tests/seed.spec.ts` as a seed. Each file includes comments referencing the spec and seed at the top:
```typescript
// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts
```

These tests do NOT use page objects — they inline login and interactions directly. This differs from the login tests which use the `Login` page object.

## Configuration

- **Playwright config**: `playwright.config.ts` — only Chromium is active (Firefox/WebKit commented out). Fully parallel locally, single worker on CI. HTML reporter.
- **CI**: GitHub Actions (`.github/workflows/playwright.yml`) runs on push/PR to main/master using Node 20.11.0 and yarn.
- **ESLint**: `.eslintrc.yml` — TypeScript ESLint with recommended rules.
- **GitHub Copilot agents**: `.github/agents/` contains agent definitions for test planning, generation, and healing using the Playwright MCP server.

## Test Login

All tests authenticate against Sauce Demo with credentials from `data/loginData.json`:
- Username: `standard_user`
- Password: `secret_sauce`
