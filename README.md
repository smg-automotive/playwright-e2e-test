
# Playwright Automation Framework

This repository contains a Playwright-based test automation framework designed for robust and scalable testing of web applications and APIs. It supports multiple environments, custom fixtures, and integrates essential libraries for enhanced functionality.

---

## **Table of Contents**
1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Running Tests](#running-tests)
5. [Environment Configuration](#environment-configuration)
6. [Custom Fixtures](#custom-fixtures)
7. [Reporting](#reporting)
8. [Best Practices](#best-practices)

---

## **Features**
- **Playwright Integration**:
    - Multi-browser testing: Chromium, Firefox, WebKit.
    - Integrated test runner and debugging UI.

- **API Testing**:
    - `APIClient` class for reusable API interactions.
    - Token-based authentication support.

- **UI Testing**:
    - Page Object Model (POM) structure for scalable UI tests.
    - `UIClient` for common UI actions.

- **Environment Flexibility**:
    - `.env` files for local, development, and production setups.
    - Dynamic environment-based test execution.

- **Custom Fixtures**:
    - `token`, `apiClient`, `uiClient` for reusable test dependencies.

- **Advanced Utilities**:
    - Faker for dynamic test data.
    - Date utilities via `date-fns`.
    - Encrypted storage using `crypto-js`.

- **Reporting**:
    - Integrated Playwright HTML reporter.

---

## **Project Structure**
```
src/
├── actions/
│   ├── apiActions/
│   └── uiActions/
├── lib/
│   ├── api/
│   ├── generic/
│   └── ui/
├── resources/
│   ├── consts/
│   └── uploads/
tests/
├── api/
├── ui/
playwright.config.ts
.env.local
.env.dev
.env.production
```

- **`actions/`**: API and UI-specific actions organized by feature.
- **`lib/`**: Core utilities, fixtures, and helper classes.
- **`resources/`**: Constants, test data, and upload files.
- **`tests/`**: Test case organization by type (API, UI).

---

## **Setup Instructions**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/playwright-automation.git
   cd playwright-automation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
    - Create `.env.local`, `.env.dev`, and `.env.production` files based on the template:
      ```env
      AUTO_CONTRACT_TYPE_USER_EMAIL=user@example.com
      AUTO_CONTRACT_TYPE_USER_PASSWORD=secure-password
      BASE_URL=https://your-base-url.com
      API_BASE_URL=https://your-api-url.com
      ORGANIZATION_ID=12345
      ```

4. **Verify installation**:
   ```bash
   npx playwright doctor
   ```

---

## **Running Tests**
### **Run All Tests**
```bash
npx playwright test
```

### **Run Tagged Tests**
- `@ContractType`:
  ```bash
  npx playwright test --grep @tag
  ```

### **Run Tests for Specific Environments**
Defined in `package.json`:
- **Local**:
  ```bash
  npm run test:local
  ```

- **Development**:
  ```bash
  npm run test:dev
  ```

- **Debug Mode**:
  Launch Playwright's test UI for debugging:
  ```bash
  npm run debug
  ```

---

## **Environment Configuration**
Environment variables are dynamically loaded using [dotenv](https://www.npmjs.com/package/dotenv).

### **Environment-Specific `.env` Files**:
- `.env.local`: Configuration for local development.
- `.env.dev`: Configuration for the development environment.

Example `.env`:
```env
AUTO_CONTRACT_TYPE_USER_EMAIL=user@example.com
AUTO_CONTRACT_TYPE_USER_PASSWORD=secure-password
BASE_URL=https://demo.example.com
API_BASE_URL=https://api.demo.example.com
ORGANIZATION_ID=12345
```

---

## **Custom Fixtures**
The framework includes reusable fixtures to simplify test dependencies:
- **`token`**: Dynamically generates a Bearer token for authenticated API requests.
- **`apiClient`**: Reusable API client for interacting with REST APIs.
- **`uiClient`**: Encapsulates common UI actions for consistency and reusability.

These fixtures are defined in `fixtures.ts` and injected into tests automatically.

---

## **Reporting**
- **HTML Reporter**:
  Generates detailed reports of test execution.
  ```bash
  npx playwright show-report
  ```

- **Trace Viewer**:
  Captures execution traces for debugging.
  ```bash
  npx playwright test --trace on
  npx playwright show-trace trace.zip
  ```

- **TRX Reports**:
  Uses `playwright-trx-reporter` for generating `.trx` reports compatible with CI systems.

---

## **Best Practices**
- **Use Tags**: Tag tests with meaningful labels (e.g., `@ContractType`, `@CleanUp`) for easy filtering.
- **Organize Tests**: Follow the Page Object Model (POM) for scalable UI test structure.
- **Avoid Hardcoding**: Use environment variables for sensitive or dynamic values.
- **Debug Effectively**: Leverage Playwright's debug tools and trace viewer for troubleshooting.
- **Optimize Tests**: Ensure tests are independent and avoid redundant actions.

---

## **Contributing**
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
