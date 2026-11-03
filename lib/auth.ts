import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "./mongoose";

export async function initAuth() {
  const mongooseInstance = await dbConnect();
  const client = mongooseInstance.connection.getClient();
  const instance = betterAuth({
    database: mongodbAdapter(client.db()),
    emailAndPassword: { enabled: true },
    trustedOrigins: [
      "http://localhost:3000",
      "https://blog-rticked.vercel.app",
      "https://blog-alpha-nine-57.vercel.app",
    ],
  });

  return instance;
}