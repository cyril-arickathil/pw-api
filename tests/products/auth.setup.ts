import { test as setup, expect } from "@playwright/test";

// API automation
// serialization , deserialization
// Auth process -- token , oauth2.0 and all that stuff
const URL = "https://practicesoftwaretesting.com/";
const authFile = ".auth/admin.json";

setup("login to authenticate", async ({ page }) => {
  await page.goto(URL);
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("admin@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();

  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe"
  );

  await page.context().storageState({ path: authFile });
});
