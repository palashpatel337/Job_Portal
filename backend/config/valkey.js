import { createClient } from "redis";

const client = createClient({
  url: process.env.VALKEY_URL || "redis://localhost:6379",
});

client.on("error", (err) => console.log("❌ Valkey Error:", err));
client.on("connect", () => console.log("✅ Valkey Connected"));

export default client;