import express from "express";
import cors from 'cors';
import path from 'path';

import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

// API routes
app.use("/api/products", productRoutes);

// Serve frontend if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "dist", "index.html"));
  });
}

// Root route for Railway health check
app.get("/", (req, res) => {
  res.send("API is running on Railway 🚀");
});

// Connect to DB before starting server
connectDB();

// Define port (must be before listen)
const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
