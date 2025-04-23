import { test, expect } from "@playwright/test";

test('check if button is disabled', async ({ page }) => {
    await page.click('button:has(i.fa-filter)');
    await page.locator('.v-select:has(label:text("Supplier")) .mdi-menu-down').click();    
    await page.locator('.v-list-item:has-text("liqui-moly-restock")').click();  
    // await page.waitForSelector('table tr');
    await page.locator('.v-list-item button:has(i.fa-times)').click();  // table close button
    //await page.waitForTimeout(1000);
    await expect(page.locator('tr').nth(1)).toBeVisible();
    await page.locator('tr').nth(1).click();
    await page.locator('i.fa-ellipsis-h').click();
    await page.getByText('Avis erstellen').click();



    // const submitButton = await page.locator('button[type="submit"]');
    // const isDisabled = await submitButton.isDisabled();
    // expect(isDisabled).toBe(true);
});
test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("dont get started link check type-check in playwright", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  const button = page.getByRole("link", { name: "Get started" });
  await button.click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
