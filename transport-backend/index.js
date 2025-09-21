const express = require("express");
const cors = require("cors");
require("dotenv").config();

const busRoutes = require("./routes/busRoutes");
const stopRoutes = require("./routes/stopRoutes");
const { moveBuses } = require("./services/busService");

const app = express();
app.use(cors());

const PORT = 5000;

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/stops", stopRoutes);

// Smooth bus movement every second
setInterval(moveBuses, 1000);

app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
