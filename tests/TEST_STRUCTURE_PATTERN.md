# Test Structure Pattern Documentation

This document outlines the standardized test structure pattern that all test cases must follow in this project.

## Overview

All tests follow the **Page Object Model (POM)** pattern combined with **Playwright Test** framework conventions. This ensures consistency, maintainability, and reusability across the test suite.

---

## Test File Structure

### 1. **Test Spec File** (e.g., `login.spec.ts`)

#### Required Imports
```typescript
import { test, expect } from "@playwright/test";
import { PageObjectClass } from "../pages/PageObjectClass";
import data from "../data/testData.json"; // if needed
```

#### Basic Test Structure
```typescript
test.describe("Feature/Scenario Group", () => {
  test("Descriptive test name in sentence case", async ({ page }) => {
    // 1. Arrange - Setup and initialization
    const pageObject = new PageObject(page);
    
    // 2. Act & Assert with test.step() for organization
    await test.step("Step description", async () => {
      // Perform action
      await pageObject.action();
    });
    
    await test.step("Verify expected result", async () => {
      // Assert result
      await expect(pageObject.element).toHaveValue("expectedValue");
    });
  });
});
```

#### Complete Example
```typescript
import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import userData from "../data/loginData.json";

test.describe("Login scenarios", () => {
  test("Login using valid credentials", async ({ page }) => {
    const loginPage = new Login(page);
    
    await test.step("Navigate to the login page", async () => {
      await loginPage.gotoLoginPage();
    });
    
    await test.step("Fill the login form", async () => {
      await loginPage.fillUsername(userData.credentials.username);
      await loginPage.fillPassword(userData.credentials.password);
      await loginPage.clickOnLoginButton();
    });
    
    await test.step("Check that the user is redirected to the inventory page", async () => {
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page).toHaveTitle(/.*Swag Labs/);
    });
  });
});
```

---

## Page Object File Structure

### 2. **Page Object Class** (e.g., `Login.ts`)

#### Required Components

```typescript
import { type Locator, type Page } from "@playwright/test";

export class PageObjectName {
  // 1. Properties
  readonly page: Page;
  readonly element1: Locator;
  readonly element2: Locator;
  readonly button1: Locator;

  // 2. Constructor - Initialize page and locators
  constructor(page: Page) {
    this.page = page;
    this.element1 = page.locator('[data-test="selector"]');
    this.element2 = page.locator('[data-test="another-selector"]');
    this.button1 = page.locator('[data-test="button-selector"]');
  }

  // 3. Navigation Methods
  async goto() {
    await this.page.goto("https://example.com/path");
  }

  // 4. Interaction Methods - Single responsibility
  async fillField(value: string) {
    await this.element1.fill(value);
  }

  async clickButton() {
    await this.button1.click();
  }

  // 5. Composite Methods - Combine related actions
  async fillAndSubmit(value: string) {
    await this.fillField(value);
    await this.clickButton();
  }
}
```

#### Complete Example
```typescript
import { type Locator, type Page } from "@playwright/test";

export class Login {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async gotoLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async fillUsername(user: string) {
    await this.username.fill(user);
  }

  async fillPassword(pass: string) {
    await this.password.fill(pass);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }

  // Composite method for convenience
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickOnLoginButton();
  }
}
```

---

## Key Patterns & Best Practices

### 1. **Naming Conventions**
- **Test files**: `featureName.spec.ts`
- **Page objects**: `FeatureName.ts` (PascalCase)
- **Test groups**: `"Feature/scenario descriptive name"`
- **Test names**: Clear, descriptive, in present tense
  - ✅ Good: `"Login using valid credentials"`
  - ❌ Bad: `"test login"`, `"login1"`

### 2. **Test Steps Organization**
- Use `test.step()` to group related actions
- Each step should be a logical unit of work
- Steps appear in test results for better debugging

```typescript
await test.step("Step description", async () => {
  // Implementation
});
```

### 3. **Page Object Principles**
- **Single Responsibility**: Each method does one thing
- **Descriptive Names**: Method names clearly describe what they do
- **Encapsulation**: Hide implementation details from tests
- **Reusability**: Methods should be generic and reusable

### 4. **Locator Selection**
Prefer this priority order:
1. `[data-test="..."]` - Best (explicit test attributes)
2. `getByRole()` - Good (semantic)
3. `getByLabel()` - Good (accessible)
4. CSS selectors - Acceptable
5. XPath - Last resort

### 5. **Assertions**
- Use `expect()` from Playwright
- Assert in test steps
- One assertion per logical check

```typescript
await test.step("Verify results", async () => {
  await expect(page).toHaveURL(expectedUrl);
  await expect(element).toHaveValue(expectedValue);
  await expect(element).toBeVisible();
});
```

### 6. **Test Data Management**
- Store test data in `data/` folder (JSON format)
- Reference in tests via import
- Use faker library for dynamic/random data

```typescript
import userData from "../data/loginData.json";
// Usage: userData.credentials.username
```

---

## File Organization

```
automationpw/
├── pages/
│   ├── Login.ts
│   ├── contactUs.ts
│   └── Inventory.ts
├── data/
│   ├── loginData.json
│   └── inventoryData.json
├── tests/
│   ├── login.spec.ts
│   ├── contactUs.spec.ts
│   ├── inventory.spec.ts
│   ├── inventory.plan.md
│   └── TEST_STRUCTURE_PATTERN.md (this file)
└── playwright.config.ts
```

---

## Common Test Patterns

### Pattern 1: Simple Action & Assertion
```typescript
test("Simple action test", async ({ page }) => {
  const pageObj = new PageObject(page);
  
  await test.step("Perform action", async () => {
    await pageObj.actionMethod();
  });
  
  await test.step("Verify result", async () => {
    await expect(pageObj.result).toBeVisible();
  });
});
```

### Pattern 2: Form Filling
```typescript
test("Fill and submit form", async ({ page }) => {
  const form = new FormPage(page);
  
  await test.step("Fill form fields", async () => {
    await form.fillName("John");
    await form.fillEmail("john@example.com");
  });
  
  await test.step("Submit form", async () => {
    await form.clickSubmit();
  });
  
  await test.step("Verify submission", async () => {
    await expect(page).toHaveURL(/.*success/);
  });
});
```

### Pattern 3: Navigation Flow
```typescript
test("Navigate through pages", async ({ page }) => {
  const nav = new Navigation(page);
  
  await test.step("Start navigation", async () => {
    await nav.gotoHome();
  });
  
  await test.step("Navigate to next page", async () => {
    await nav.clickNextButton();
  });
  
  await test.step("Verify page loaded", async () => {
    await expect(page).toHaveURL(/.*page-2/);
  });
});
```

### Pattern 4: Using Test Data
```typescript
import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import userData from "../data/loginData.json";
import { faker } from "@faker-js/faker";

test("Login with various credentials", async ({ page }) => {
  const loginPage = new Login(page);
  
  await test.step("Navigate to login", async () => {
    await loginPage.gotoLoginPage();
  });
  
  await test.step("Login with valid credentials", async () => {
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });
  
  await test.step("Verify login success", async () => {
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
```

---

## Dos and Don'ts

### ✅ DO
- Create reusable page objects
- Use descriptive names
- Organize tests with `test.describe()`
- Use `test.step()` for clarity
- Store test data separately
- Use data-test attributes for locators
- Keep methods focused and single-purpose
- Use async/await properly

### ❌ DON'T
- Hardcode URLs or test data in spec files
- Create overly complex page objects
- Use brittle locators (by text only)
- Mix page object logic with test logic
- Create untestable or circular dependencies
- Skip test.step() organization
- Use generic method names
- Ignore error messages in assertions

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login.spec.ts

# Run tests matching pattern
npx playwright test -g "Login scenarios"

# Run in UI mode for debugging
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed
```

---

## References

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
