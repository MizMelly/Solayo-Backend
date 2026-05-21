const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", require("../routes/blogRoutes"));

module.exports = app;