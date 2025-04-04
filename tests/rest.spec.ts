import { test, expect } from "@playwright/test";

test("POST /users/login", async ({ request }) => {
  const response = await request.post(
    "https://thinking-tester-contact-list.herokuapp.com/users/login",
    {
      data: {
        email: "cyril_test@fake.com",
        password: "faketest",
      },
    }
  );
  const body = await response.json();
  expect(body.token, "token is null").not.toBeNull();
  console.log(body);
});
