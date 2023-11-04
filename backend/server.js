const path = require("path");
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

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

// serve frontend
if (process.env.NODE_ENV === "production") {
  // set static folder to frontend build folder
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk" });
  });
}

// server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
