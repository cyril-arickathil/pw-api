import { test, expect } from "@playwright/test";

test("POST /avaialable dogs", async ({ request }) => {
  const response = await request.post("https://pet-library.moonhighway.com/", {
    data: {
      query: `
     query AllPets {
    allPets(status: AVAILABLE, category: DOG) {
        id
        name
        weight
        category
        status
        dueDate
    }
}`
    },
  });
  const body = await response.json();
  console.log(body.data.allPets);
  expect.soft(body.data.allPets).toHaveLength(2);
});

test("POST /mutation/login", async ({ request }) => {
  const response = await request.post("https://pet-library.moonhighway.com/", {
    data: {
      query: `mutation LogIn {
    logIn(username: "frostbyte", password: "frostbyte") {
        token
    }
}`,
    },
  });
  const body = await response.json();
  console.log(body);
  expect(body.data.logIn.token, "incorrect token ").not.toBeNull();
});
