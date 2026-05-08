const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/cart", require("./routes/cartRoutes"));


app.listen(5000, () =>
  console.log("Server running on port 5000")
);
app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("Test working");
});