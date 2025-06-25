import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products-routes.js";

dotenv.config();

const app = express();

app.use(cors());             
app.use(express.json());     

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/products", productRoutes);

// Optional: root route just for testing the backend URL directly
app.get("/", (req, res) => {
  res.send("API is running on Railway 🚀");
});

// Listen on Railway-provided port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
