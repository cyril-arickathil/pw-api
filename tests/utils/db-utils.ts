import { Pool, PoolClient } from "pg";
import { MongoClient, Db } from "mongodb";

type PostgresConfig = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

type MongoConfig = {
  uri: string;
  dbName: string;
};

class DBUtils {
  // PostgreSQL
  private postgresPool: Pool | null = null;

  // MongoDB
  private mongoClient: MongoClient | null = null;
  private mongoDb: Db | null = null;

  /**
   * Connect to PostgreSQL
   * @param config - PostgreSQL configuration
   */
  async connectPostgres(config: PostgresConfig): Promise<void> {
    if (this.postgresPool) {
      console.warn("PostgreSQL connection already exists.");
      return;
    }

    this.postgresPool = new Pool(config);

    try {
      // Test the connection
      const client: PoolClient = await this.postgresPool.connect();
      console.log("Connected to PostgreSQL successfully.");
      client.release();
    } catch (error) {
      console.error("Failed to connect to PostgreSQL:", error);
      throw error;
    }
  }

  /**
   * Execute a query on PostgreSQL
   * @param query - SQL query string
   * @param params - Query parameters
   * @returns Query result
   */
  async executePostgresQuery(query: string, params: any[] = []): Promise<any> {
    if (!this.postgresPool) {
      throw new Error("PostgreSQL connection is not established.");
    }

    try {
      const result = await this.postgresPool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Error executing PostgreSQL query:", error);
      throw error;
    }
  }

  /**
   * Disconnect from PostgreSQL
   */
  async disconnectPostgres(): Promise<void> {
    if (this.postgresPool) {
      await this.postgresPool.end();
      this.postgresPool = null;
      console.log("Disconnected from PostgreSQL.");
    }
  }

  /**
   * Connect to MongoDB
   * @param config - MongoDB configuration
   */
  async connectMongo(config: MongoConfig): Promise<void> {
    if (this.mongoClient) {
      console.warn("MongoDB connection already exists.");
      return;
    }

    try {
      this.mongoClient = new MongoClient(config.uri);
      await this.mongoClient.connect();
      this.mongoDb = this.mongoClient.db(config.dbName);
      console.log("Connected to MongoDB successfully.");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  /**
   * Get a MongoDB collection
   * @param collectionName - Name of the collection
   * @returns MongoDB collection
   */
  getMongoCollection(collectionName: string) {
    if (!this.mongoDb) {
      throw new Error("MongoDB connection is not established.");
    }

    return this.mongoDb.collection(collectionName);
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnectMongo(): Promise<void> {
    if (this.mongoClient) {
      await this.mongoClient.close();
      this.mongoClient = null;
      this.mongoDb = null;
      console.log("Disconnected from MongoDB.");
    }
  }
}

export const dbUtils = new DBUtils();
