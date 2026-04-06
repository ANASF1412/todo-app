import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Backend API running ✅", endpoints: { health: "/api/health", auth: "/api/auth", user: "/api/user" } });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Server running ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

// For local development
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

// For Vercel serverless
export default app;
