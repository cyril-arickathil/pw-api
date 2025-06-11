import { test, expect } from "@playwright/test";
import { dbUtils } from "./db-utils";

test.describe("Database Connection Tests", () => {
  test("PostgreSQL Connection Test", async () => {
    const postgresConfig = {
      user: "your_postgres_user",
      host: "localhost",
      database: "your_postgres_db",
      password: "your_postgres_password",
      port: 5432,
    };

    // Connect to PostgreSQL
    await dbUtils.connectPostgres(postgresConfig);

    // Execute a test query
    const query = "SELECT 1 AS test";
    const result = await dbUtils.executePostgresQuery(query);

    // Validate the result
    console.log("PostgreSQL Result:", result);
    expect(result).toHaveLength(1);
    expect(result[0].test).toBe(1);

    // Disconnect from PostgreSQL
    await dbUtils.disconnectPostgres();
  });

  test("MongoDB Connection Test", async () => {
    const mongoConfig = {
      uri: "mongodb://localhost:27017",
      dbName: "your_mongo_db",
    };

    // Connect to MongoDB
    await dbUtils.connectMongo(mongoConfig);

    // Access a test collection and perform a query
    const collection = dbUtils.getMongoCollection("your_collection");
    const result = await collection.find({}).limit(1).toArray();

    // Validate the result
    console.log("MongoDB Result:", result);
    expect(result).toBeDefined();

    // Disconnect from MongoDB
    await dbUtils.disconnectMongo();
  });
});
