import { test, expect } from "@playwright/test";
import {
  AddContactResponseSchema,
  AddContactRequestSchema,
} from "./contracts/add-contact.schema";

import { z } from "zod";

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });
// API automation
// serialization , deserialization
// Auth process -- token , oauth2.0 and all that stuff

//storageState works for browser sessions — not for request-only contexts.
//hence here it wont work
const URL = "https://thinking-tester-contact-list.herokuapp.com";
test("GET [2]/contacts lists", async ({ request }) => {
  const response = await request.get(`${URL}/contacts`);
  const body = await response.json();
  console.log(body[0]._id);
  const envPath = path.resolve(__dirname, ".env");
  //path.resolve(__dirname, "../../.env");

  fs.writeFileSync(envPath, `CONTACT_ID=${body[0]._id}\n`);
});

test("GET [3]/contacts/1", async ({ request }) => {
  console.log(process.env.CONTACT_ID);
  const response = await request.get(
    `${URL}/contacts/${process.env.CONTACT_ID}`
  );
  const body = await response.json();
  await expect(response).toBeOK();
  console.log(body);
  expect.soft(body.firstName).toBe("James ");
  expect(body.lastName).toBe("David");
});

test("POST [4] Add Contact /contacts", async ({ request }) => {
  const requestBody = {
    firstName: 1478,
    lastName: "Doe",
    email: "John_Doe@test.com",
    location: {
      city: "manchester",
      country: "uk",
    },
    employer: {
      jobTitle: "",
      company: "",
    },
  };
  expect
    .soft(() => {
      AddContactRequestSchema.parse(requestBody);
    })
    .not.toThrow();

  const response = await request.post(`${URL}/contacts`, { data: requestBody });
  const responseBody = await response.json();

  await expect(response, "201 Created OK").toBeOK();
  console.log(responseBody);
  expect(() => {
    AddContactResponseSchema.parse(responseBody);
  }).not.toThrow();
});
