# Automation Testing Suite - Sauce Demo

A comprehensive end-to-end test automation suite for the Sauce Demo e-commerce application using Playwright and TypeScript.

## 🎯 Project Overview

This project contains automated tests for the Sauce Demo application (https://www.saucedemo.com/), covering key user workflows including:
- User authentication and login
- Product inventory browsing and filtering
- Product sorting and search
- Shopping cart operations
- Checkout flows
- Contact form submissions

**Test Coverage**: 26+ automated tests with 100% pass rate

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Organization](#test-organization)
- [Page Objects](#page-objects)
- [Configuration](#configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.11.0 or higher - [Download here](https://nodejs.org/)
- **npm** 10.x or higher (comes with Node.js)
- **Git** for version control
- **Visual Studio Code** (recommended) - [Download here](https://code.visualstudio.com/)

### System Requirements

- **OS**: Windows, macOS, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for dependencies and test artifacts

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd automationpw
```

### 2. Install Dependencies

```bash
# Install npm dependencies
npm install

# Or using yarn
yarn install
```

### 3. Install Playwright Browsers

```bash
# Download browser binaries
npx playwright install --with-deps

# Or using yarn
yarn playwright install --with-deps
```

### 4. Verify Installation

```bash
# Check Playwright version
npx playwright --version

# List installed browsers
npx playwright install-deps
```

---

## 📁 Project Structure

```
automationpw/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD configuration
├── pages/
│   ├── Login.ts                    # Login page object
│   ├── Inventory.ts                # Inventory page object
│   └── contactUs.ts                # Contact page object
├── data/
│   └── loginData.json              # Test data for login
├── tests/
│   ├── login.spec.ts               # Login test suite
│   ├── contactUs.spec.ts           # Contact form test suite
│   ├── seed.spec.ts                # Seed test for setup
│   ├── inventory.plan.md           # Inventory test plan
│   ├── TEST_STRUCTURE_PATTERN.md   # Test pattern documentation
│   └── inventory/
│       ├── add_to_cart.spec.ts     # Cart functionality tests
│       ├── cart_integration.spec.ts # Cart integration tests
│       ├── display_products.spec.ts # Product display tests
│       ├── edge_cases.spec.ts      # Edge case tests
│       ├── navigation_menu.spec.ts # Menu navigation tests
│       ├── product_details.spec.ts # Product detail tests
│       └── sorting.spec.ts         # Sorting functionality tests
├── test-results/                   # Test execution artifacts
├── playwright-report/              # HTML test report
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies
├── CHANGELOG.md                    # Release notes and changes
└── README.md                       # This file
```

---

## 🚀 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/inventory/add_to_cart.spec.ts
```

### Run Tests by Pattern/Tag

```bash
# Run tests matching a pattern
npx playwright test -g "Add to Cart"

# Run tests in specific directory
npx playwright test tests/inventory
```

### Run in Different Modes

```bash
# UI Mode (interactive, best for debugging)
npx playwright test --ui

# Headed Mode (with visible browser)
npx playwright test --headed

# Debug Mode (step through code)
npx playwright test --debug

# Single worker (sequential execution)
npx playwright test --workers=1
```

### Generate and View Reports

```bash
# Run tests with detailed reporting
npx playwright test

# View HTML report (auto-opens after test run)
npx playwright show-report

# View test results folder
ls test-results/
```

### Run with Specific Configuration

```bash
# Run on specific project (e.g., Chrome only)
npx playwright test --project=chromium

# Run with specific browser
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 Test Organization

### Test Suites

#### 1. **Authentication Tests** (`tests/login.spec.ts`)
- Login with valid credentials
- Redirect to inventory page verification
- Session management

#### 2. **Inventory Tests** (`tests/inventory/`)
Complete inventory page coverage with 26 tests:

**Display & Filtering** (6 tests)
- Display all products
- Sort by name (A→Z, Z→A)
- Sort by price (low→high, high→low)
- Price format verification

**Cart Operations** (4 tests)
- Add/remove single product
- Add multiple products
- Toggle add/remove functionality
- Cart state management

**Cart Integration** (4 tests)
- Cart badge count accuracy
- Cart persistence across navigation
- Cart persistence during sorting
- Item quantity tracking

**Product Details** (4 tests)
- View product by name link
- View product by image link
- Navigate back to inventory
- View product specifications

**Navigation & Menu** (5 tests)
- Open/close side menu
- Access menu items
- Reset app state
- Link visibility (About link skipped - external)

**Edge Cases** (3 tests)
- Add excessive items (6 products)
- Rapid add/remove interactions
- Data integrity after page reload

#### 3. **Contact Form Tests** (`tests/contactUs.spec.ts`)
- Fill contact form with generated data
- Form submission validation

### Test Statistics

| Category | Count | Status |
|----------|-------|--------|
| Total Tests | 26+ | ✅ Passing |
| Passing | 25 | ✅ 96.2% |
| Skipped | 1 | ⏭️ External link |
| Failed | 0 | 🎉 0% |

---

## 📄 Page Objects

Page Objects follow the Page Object Model (POM) pattern for maintainability and reusability.

### Login Page (`pages/Login.ts`)

```typescript
import { Login } from "../pages/Login";
import userData from "../data/loginData.json";

const loginPage = new Login(page);
await loginPage.gotoLoginPage();
await loginPage.fillUsername(userData.credentials.username);
await loginPage.fillPassword(userData.credentials.password);
await loginPage.clickOnLoginButton();
```

### Inventory Page (`pages/Inventory.ts`)

Methods available:
- `gotoInventory()` - Navigate to inventory page
- `sortBy(option)` - Sort products
- `addProductToCart(productId)` - Add item to cart
- `removeProductFromCart(productId)` - Remove item
- `clickCart()` - Navigate to cart page
- `getCartCount()` - Get current cart badge count
- `openMenu()` / `closeMenu()` - Control side menu

### Contact Form Page (`pages/contactUs.ts`)

```typescript
const contactForm = new ContactUs(page);
await contactForm.goto();
await contactForm.fillContact(name, lastName, email, company, message);
```

---

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
- **Timeout**: 30 seconds per test (default)
- **Retries**: 0 (can be configured)
- **Workers**: 6 parallel workers
- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: Configured per environment
- **Screenshots/Videos**: On failure

### Environment Setup

Create `.env` file for sensitive data (optional):

```env
BASE_URL=https://www.saucedemo.com/
TEST_USER=standard_user
TEST_PASSWORD=secret_sauce
```

### Test Data

Login credentials (`data/loginData.json`):

```json
{
  "credentials": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

Available test users:
- `standard_user` - Standard account
- `locked_out_user` - Locked account
- `problem_user` - User with display issues
- `performance_glitch_user` - Performance test user
- `error_user` - Error-prone user
- `visual_user` - Visual comparison user

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/playwright.yml`

**Triggers**:
- Push to `main` or `master` branch
- Pull requests to `main` or `master`

**Pipeline Steps**:
1. Checkout code
2. Setup Node.js 20.11.0
3. Install dependencies (`npm install`)
4. Install Playwright browsers
5. Run all tests
6. Upload test report artifact (30-day retention)

**Run Manually**:
```bash
# View workflow status
gh workflow list

# Run workflow manually
gh workflow run playwright.yml
```

**Artifact Management**:
- Test reports automatically uploaded
- Retention: 30 days
- Available in Actions tab on GitHub

---

## ✨ Best Practices

### Test Writing

✅ **DO**:
- Use semantic locators (`getByRole()`, `getByLabel()`)
- Organize tests with `test.describe()` blocks
- Use `test.step()` for clear step descriptions
- Keep tests focused on single functionality
- Use descriptive test names
- Store test data separately
- Follow AAA pattern (Arrange-Act-Assert)

❌ **DON'T**:
- Hardcode URLs or credentials in test files
- Use brittle selectors (text-only, nth-child)
- Create interdependent tests
- Use `page.waitForTimeout()`
- Mix page logic with test logic
- Skip error messages in assertions

### Selector Priority

1. `getByRole()` - Semantic, accessibility-friendly
2. `getByLabel()` - Form labels
3. `getByPlaceholder()` - Input placeholders
4. `getByText()` - Element text
5. `[data-test="..."]` - Explicit test attributes
6. CSS selectors - Last resort

### Code Organization

- **Page Objects**: In `pages/` directory
- **Tests**: In `tests/` directory (organized by feature)
- **Test Data**: In `data/` directory (JSON format)
- **Fixtures**: Use Playwright fixtures for setup/teardown
- **Utilities**: Create helper functions for common operations

---

## 🐛 Troubleshooting

### Common Issues

#### Tests Timeout
```bash
# Increase timeout in playwright.config.ts
timeout: 60000 // milliseconds

# Or run specific test with timeout
npx playwright test --timeout=60000
```

#### Browser Installation Fails
```bash
# Clear cache and reinstall
rm -rf ~/.cache/ms-playwright
npx playwright install --with-deps
```

#### Locator Not Found
```bash
# Use debug mode to inspect elements
npx playwright test --debug

# Or run in UI mode to see selector suggestions
npx playwright test --ui
```

#### Tests Failing in CI but Passing Locally
- Check Node.js version compatibility
- Verify environment variables
- Run with `--headed=false` explicitly
- Check browser versions in CI

#### Port Already in Use
```bash
# Kill process using port 3000 (example)
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Debug Commands

```bash
# Run with debug logs
PWDEBUG=1 npx playwright test

# Inspect specific element
npx playwright codegen https://www.saucedemo.com

# Record user interaction and generate code
npx playwright codegen
```

### Getting Help

- **Playwright Docs**: https://playwright.dev
- **GitHub Issues**: Report bugs here
- **Stack Overflow**: Search `[playwright]` tag
- **Discord Community**: Playwright community support

---

## 🤝 Contributing

### Development Workflow

1. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/add-new-tests
   ```

2. **Follow the test structure pattern** (see `TEST_STRUCTURE_PATTERN.md`)

3. **Write tests** following best practices

4. **Run tests locally**:
   ```bash
   npx playwright test
   ```

5. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add inventory sorting tests"
   ```

6. **Push and create a PR**:
   ```bash
   git push origin feature/add-new-tests
   ```

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Format code with Prettier (if configured)
- Use meaningful variable names
- Add comments for complex logic

### Adding New Tests

1. Create test file in appropriate `tests/` subdirectory
2. Follow naming: `{feature}.spec.ts`
3. Reference test plan documentation
4. Include step descriptions in tests
5. Update this README if adding new test categories

### Pull Request Checklist

- [ ] Tests are passing locally
- [ ] Code follows style guidelines
- [ ] New tests follow POM pattern
- [ ] Test data is not hardcoded
- [ ] PR description explains changes
- [ ] GitHub Actions pipeline passes
- [ ] Documentation is updated

---

## 📚 Documentation

- **[Test Structure Pattern](tests/TEST_STRUCTURE_PATTERN.md)** - Standardized test patterns
- **[Inventory Test Plan](tests/inventory.plan.md)** - Detailed inventory test coverage
- **[Changelog](CHANGELOG.md)** - Project changes and updates
- **[Playwright Docs](https://playwright.dev)** - Official documentation

---

## 📈 Performance & Metrics

### Test Execution Time
- **Full Suite**: ~9-15 seconds (parallel, 6 workers)
- **Single Test**: ~1-2 seconds average
- **Fastest**: 700ms
- **Slowest**: 4-5 seconds (login tests)

### Test Environment
- **Browser**: Chromium, Firefox, WebKit
- **Parallelization**: 6 workers
- **Retries**: Disabled (can be configured)
- **Screenshots**: On failure only

### Optimization Tips
- Run tests in parallel (default: 6 workers)
- Use specific test files instead of full suite
- Enable headless mode (faster rendering)
- Run on SSD for better I/O performance

---

## 📝 License

[Specify your license here - e.g., MIT, Apache 2.0]

---

## 🎓 Learning Resources

- **Playwright Tutorial**: https://playwright.dev/docs/intro
- **Best Practices**: https://playwright.dev/docs/best-practices
- **API Reference**: https://playwright.dev/docs/api/class-playwright
- **Debugging**: https://playwright.dev/docs/debug
- **CI/CD Integration**: https://playwright.dev/docs/ci

---

## 📞 Support

For issues, questions, or suggestions:

1. **Check existing issues** on GitHub
2. **Review documentation** in this project
3. **Create a new issue** with detailed information
4. **Contact team members** for specific questions

---

## 🎉 Quick Start Summary

```bash
# 1. Clone and install
git clone <repo-url>
cd automationpw
npm install
npx playwright install --with-deps

# 2. Run tests
npx playwright test

# 3. View results
npx playwright show-report

# 4. Debug as needed
npx playwright test --debug
```

---

**Last Updated**: January 19, 2026  
**Maintained By**: QA Team  
**Status**: ✅ Active and Maintained
