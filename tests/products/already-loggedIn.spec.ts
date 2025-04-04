import { test, expect } from "@playwright/test";

test("already authenticated user", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/admin");

  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "John Doe"
  );
});
