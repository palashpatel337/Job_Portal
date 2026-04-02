import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import valkeyClient from "./config/valkey.js";



import fs from "fs";
import connectDB from "./config/db.js";

import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import companyRoute from "./routes/companyRoute.js";
import applicationRoute from "./routes/applicationRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-omega-rose.vercel.app"
  ],
  credentials: true
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api", uploadRoute);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("MONGO_URL =", process.env.MONGO_URL);
    await connectDB();
    await valkeyClient.connect(); // 🔥 connect valkey


    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to DB", error);
    process.exit(1);
  }
};

startServer();