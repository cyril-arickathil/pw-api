import { test, expect } from "@playwright/test";

test.describe("Login Page Tests", () => {
  const baseUrl = "https://practicetestautomation.com/practice-test-login/";

  test("Navigate to the login page", async ({ page }) => {
    // Navigate to the URL
    await page.goto(baseUrl, { waitUntil: "commit" });

    // Verify the page title
    await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);
  });

  test("Perform positive login", async ({ page }) => {
    // Navigate to the URL
    await page.goto(baseUrl);

    await page.fill('input[name="username"]', "student");
    await page.fill('input[name="password"]', "Password123");
    await page.click('button[type="submit"]');

    // Fill in the username and password using preferred locators
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");

    // Click the submit button
    await page.getByRole("button", { name: "Submit" }).click();

    // Verify the new page URL
    await expect(page).toHaveURL(/.*logged-in-successfully/);

    // Verify the success message
    await expect(
      page.getByRole("heading", {
        name: "Congratulations student. You successfully logged in!",
      })
    ).toBeVisible();

    // Verify the "Log out" button is displayed
    await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  });

  test("Negative login test - invalid username", async ({ page }) => {
    // Navigate to the URL
    await page.goto(baseUrl);

    // Fill in an incorrect username and valid password
    await page.getByRole("textbox", { name: "Username" }).fill("incorrectUser");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");

    // Click the submit button
    await page.getByRole("button", { name: "Submit" }).click();

    // Verify the error message
    await expect(page.getByRole("alert")).toHaveText(
      "Your username is invalid!"
    );
  });

  test("Negative login test - invalid password", async ({ page }) => {
    // Navigate to the URL
    await page.goto(baseUrl);

    // Fill in a valid username and incorrect password
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("incorrectPassword");

    // Click the submit button
    await page.getByRole("button", { name: "Submit" }).click();

    // Verify the error message
    await expect(page.getByRole("alert")).toHaveText(
      "Your password is invalid!"
    );
  });
});
