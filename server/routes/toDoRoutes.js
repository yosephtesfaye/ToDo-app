const express = require("express");
const router = express.Router(); // Create an instance of express router
const ToDo = require("../model/toDoModel"); // Import mongoose model

// GET Request |  http://localhost:5000/todo/get-all
router.get("/get-all", (req, res) => {
  // Find and return whole dosuments in the ToDo collection
  ToDo.find((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json(err); // Error
    } else {
      console.log("Get todos successfully");
      res.status(200).json(data); // Sends the documents as a response
    }
  });
});

// POST Request |  http://localhost:5000/todo/add-new
router.post("/add-new", (req, res) => {
  const body = req.body; // HTTP POST method body data

  // Create an instance using model
  const todo = ToDo({
    Date: body.date,
    Title: body.title,
    Subtitle: body.subtitle,
    Chips: body.chips,
  });

  todo.save((err, document) => {
    if (err) res.status(500).json(err);
    else {
      console.log("Todo added", document);
      res.status(200).json({ "Todo added": document });
    }
  });
});

// DELETE Request |  http://localhost:5000/todo/remove/:id
router.delete("/remove/:id", (req, res) => {
  const id = req.params.id; // Get todo's id via params

  ToDo.findByIdAndDelete(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log("Todo deleted");
      res.status(200).json("Todo deleted");
    }
  });
});

// PUT Request |  http://localhost:5000/todo/update/:id
router.put("/update/:id", (req, res) => {
  let id = req.params.id; // Get todo's id via params
  let body = req.body; // Get body data
  const todo = {
    Date: body.date,
    Title: body.title,
    Subtitle: body.subtitle,
    Chips: body.chips,
  };

  // Find the todo by id and update the document
  ToDo.findByIdAndUpdate(id, todo, (err, document) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log("Todo updated");
      res.status(200).json({ "Todo updated": document });
    }
  });
});

module.exports = router;
