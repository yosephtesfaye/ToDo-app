const express = require("express");
// Initialize express app
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const todos = require("./routes/toDoRoutes");

const PORT = 5000;
const MONGO_URI = "mongodb+srv://yoye:Pass123@cluster0.r9cuqx7.mongodb.net/ToDo";

app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: true })); // Parse payloads
app.use("/todo", todos); // todo router middleware

// Connect mongodb service
mongoose.connect(MONGO_URI, (err) => {
  if (err) console.log(err);
  console.log("DB connection established");
});

// Run the server on port 5000
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
