# Playwright E2E Tests

This project contains end-to-end tests for [academybugs.com/find-bugs](https://academybugs.com/find-bugs/) using [Playwright](https://playwright.dev/).

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests

```bash
npx playwright test
```

## Using Allure as a Reporter

[Allure](https://docs.qameta.io/allure/) is a flexible, lightweight multi-language test reporting tool.

### Steps to add Allure as a reporter:

1. **Install Allure dependencies:**

   ```bash
   npm install -D allure-playwright
   ```

2. **Update Playwright config:**
   In your `playwright.config.ts`, add `allure-playwright` to the `reporters` array:

   ```ts
   import { defineConfig } from "@playwright/test";

   export default defineConfig({
     // ...existing code...
     reporters: [["list"], ["allure-playwright"]],
   });
   ```

3. **Run your tests:**

   ```bash
   npx playwright test
   ```

4. **Generate and open Allure report:**
   - Generate the report:
     ```bash
     npx allure generate ./allure-results --clean -o ./allure-report
     ```
   - Open the report:
     ```bash
     npx allure open ./allure-report
     ```

## Using API_TOKEN as an Environment Variable

You may need to use a secret API token in your tests. The recommended way is to store it in an environment variable and access it via `process.env`.

### Steps to save and use `API_TOKEN` as `process.env.TOKEN`:

1. **Set the environment variable:**

   - On **Linux/macOS**:
     ```bash
     export TOKEN=your_api_token_here
     ```
   - On **Windows (Command Prompt)**:
     ```cmd
     set TOKEN=your_api_token_here
     ```
   - On **Windows (PowerShell)**:
     ```powershell
     $env:TOKEN="your_api_token_here"
     ```

2. **Use the token in your Playwright tests:**
   ```ts
   const token = process.env.TOKEN;
   // Example usage in an API request
   const response = await request.get("https://api.example.com/data", {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   ```

**Tip:** You can use a `.env` file and the [dotenv](https://www.npmjs.com/package/dotenv) package for local development. Add this to the top of your test or config file:

```ts
require("dotenv").config();
```

And create a `.env` file:

```
TOKEN=your_api_token_here
```

## Project Structure

- `tests/` - Contains Playwright test files
- `playwright.config.ts` - Playwright configuration
- `allure-results/` - Allure raw results (generated after test run)
- `allure-report/` - Allure HTML report (generated after running allure generate)

## Useful Commands

- Run all tests: `npx playwright test`
- Run tests with UI: `npx playwright test --ui`
- Show Allure report: `npx allure open ./allure-report`

---

For more details, see the [Playwright documentation](https://playwright.dev/) and [Allure documentation](https://docs.qameta.io/allure/).
