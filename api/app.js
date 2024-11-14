import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// CONNECTING TO DATABASE
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Database connection error:", err));

const app = express();

// CORS options to allow localhost with any port and credentials
const corsOptions = {
  origin: (origin, callback) => {
    // Allow any localhost origin (with any port)
    if (!origin || origin.includes("localhost")) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization)
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

// Middleware setup
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser()); // Parse cookies

// Define Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Start the server
app.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
