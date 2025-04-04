import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
// API automation
// serialization , deserialization
// Auth process -- token , oauth2.0 and all that stuff
const URL = "https://thinking-tester-contact-list.herokuapp.com";

setup("POST [Setup][1] /users/login", async ({ request }) => {
  const response = await request.post(`${URL}/users/login`, {
    data: {
      email: "cyril_test@fake.com",
      password: "faketest",
    },
  });
  const body = await response.json();
  expect(body.token, "token is null").not.toBeNull();
  console.log(body);
  const envPath = path.resolve(__dirname, "../../.env");
  //path.resolve(__dirname, "../../.env");

  fs.writeFileSync(envPath, `API_TOKEN=${body.token}\n`);
});
