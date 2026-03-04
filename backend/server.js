import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRouter.js";

const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/admin", adminRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});