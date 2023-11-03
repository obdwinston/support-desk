const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// connect db (with mongoose)
connectDB();
// ensure password provided in .env file (under MongoDB URI)
// ensure collection provided in .env file (under MongoDB URI)
// restart server if any changes to .env file (in terminal: npm run server)
// ensure network access set to all IP addresses (in MongoDB Atlas)

// initialise app (with express)
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // parses JSON data
app.use(express.urlencoded({ extended: false })); // parses URL-encoded data

app.get("/", (req, res) => {
  // res.send("hello");
  res.status(200).json({ message: "Welcome" });
});

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
