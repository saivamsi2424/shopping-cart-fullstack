const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);

// PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

// DB connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
