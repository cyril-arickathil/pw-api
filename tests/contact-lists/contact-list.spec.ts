import { test, expect } from "@playwright/test";
import {z} from 'zod'
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });
// API automation
// serialization , deserialization
// Auth process -- token , oauth2.0 and all that stuff

//storageState works for browser sessions — not for request-only contexts.
//hence here it wont work
const URL = "https://thinking-tester-contact-list.herokuapp.com";
let CONTACT_ID: string;

test("retreive contact id and get contact details GET [2] /contacts", async ({ request }) => {
  const response = await request.get(`${URL}/contacts`);
  const body = await response.json();
  console.log(body);
  CONTACT_ID = body[0]._id;
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
  const getContactDetails = await request.get(
    `${URL}/contacts/${CONTACT_ID}`
  );
  const getContactDetailsBody = await getContactDetails.json();
  console.log(getContactDetailsBody);
  expect(getContactDetailsBody._id).toBe(CONTACT_ID);
}
);
