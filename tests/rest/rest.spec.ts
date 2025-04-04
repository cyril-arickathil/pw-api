import { test, expect } from "@playwright/test";

// API automation
// serialization , deserialization
// Auth process -- token , oauth2.0 and all that stuff
const URL = "https://thinking-tester-contact-list.herokuapp.com";

test("POST /users/login", async ({ request }) => {
  const response = await request.post(`${URL}/users/login`, {
    data: {
      email: "cyril_test@fake.com",
      password: "faketest",
    },
  });
  const body = await response.json();
  expect(body.token, "token is null").not.toBeNull();
  console.log(body);
});
