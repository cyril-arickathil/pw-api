import { test, expect } from "@playwright/test";

test("handling windows", async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto("https://demoblaze.com/");
  await page2.goto("https://www.automationexercise.com/");
});

//https://practicesoftwaretesting.com/admin
test("handling new page", async ({ page, context }) => {
  await page.goto("https://practicesoftwaretesting.com/admin");
  // Start waiting for new page before clicking. Note no await.
  const pagePromise = context.waitForEvent("page");
  await page.getByText("Support this project").click();
  const newPage = await pagePromise;
  // Interact with the new page normally.
  await newPage.getByRole("link", { name: " Courses " }).click();
  console.log(await newPage.title());
  const allPages = context.pages();
  console.log(`number of pages opened: ${allPages.length}`);
  await context.close();
});

test("rare use cases 01", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/admin");

  const allItems = await page.getByRole("listitem").all();

  allItems.forEach(async (item) => {
    await item.textContent();
  });
});

test("rare use cases 02", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/admin");
  const popUp = await page.waitForEvent("popup");
  await page.getByRole("button", { name: "open popup" }).click();
  await popUp.getByRole("button", { name: "close" }).click();
});

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route("*/**/api/v1/fruits", async (route) => {
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto("https://demo.playwright.dev/api-mocking");

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText("Strawberry")).toBeVisible();
});
test("gets the json from api and adds a new fruit", async ({ page }) => {
  // Get the response and add to it
  await page.route("*/**/api/v1/fruits", async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: "Loquat", id: 100 });
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });

  // Go to the page
  await page.goto("https://demo.playwright.dev/api-mocking");

  // Assert that the new fruit is visible
  await expect(page.getByText("Loquat", { exact: true })).toBeVisible();
});
