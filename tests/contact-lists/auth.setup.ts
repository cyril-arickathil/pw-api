import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { emailId, password } from "../pages/login-page";
// API automation
// serialization , deserialization
// Auth process -- token , oauth2.0 and all that stuff
const URL = "https://thinking-tester-contact-list.herokuapp.com";

setup("POST [Setup][1] /users/login", async ({ request }) => {
  const response = await request.post(`${URL}/users/login`, {
    data: {
      email: emailId,
      password: password,
    },
  });
  const body = await response.json();
  expect(body.token, "token is null").not.toBeNull();
  console.log(body);
  const envPath = path.resolve(__dirname, "../../.env");
  //path.resolve(__dirname, "../../.env");

  fs.writeFileSync(envPath, `API_TOKEN=${body.token}\n`);
});
