import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import companyRoute from "./routes/companyRoute.js";
import applicationRoute from "./routes/applicationRoutes.js";

const app = express();

dotenv.config();

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL,
//   "https://job-portal.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(null, true); // allow all vercel preview urls
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

app.use(cors({
  origin: true,
  credentials: true
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// static folder
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to DB", error);
    process.exit(1);
  }
};

startServer();