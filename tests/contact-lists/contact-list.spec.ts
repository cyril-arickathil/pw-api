import { test, expect } from "@playwright/test";
import {z} from 'zod'
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
 await expect(response).toBeOK();
  const schema = z.array(
    z.object(
      {
         _id: z.string(),
      firstName: z.number(),
      lastName: z.string(),
    email: z.string(),
    owner: z.string(),
    __v: z.number(),
      }
    )
     
  )
  expect(() =>
  {
schema.safeParse(body)
  }).not.toThrow()
  
});

test("GET [3]/contacts/1", async ({ request }) => {
  console.log(process.env.CONTACT_ID);
  const response = await request.get(
    `${URL}/contacts/${process.env.CONTACT_ID}`
  );
  const body = await response.json();
  console.log(body);
  expect.soft(body.firstName).toBe("James ");
  expect(body.lastName).toBe("David");
});
