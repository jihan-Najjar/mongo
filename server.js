const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello jihan");
});
app.post("/tasks", async (req, res) => {
  // console.log(req.body)
  try {
    const tasks = await Task.create(req.body);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.massage);
    res.status(400).json({ massage: error.massage });
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.massage);
    res.status(400).json({ massage: error.massage });
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    console.log(error.massage);
    res.status(400).json({ massage: `This task with ID ${id} dosen't exist ` });

  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res
        .status(401)
        .json({ massage: `This task with ID ${id} dosen't exist ` });
    }
    const updatTask = await Task.findById(id);

    res.status(200).json(updatTask);
  } catch (error) {
    console.log(error.massage);
    res.status(400).json({ massage: error.massage });
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(401)
        .json({ massage: `This task with ID ${id} dosen't exist ` });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error.massage);
    res.status(400).json({ massage: error.massage });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://217131:XrDwlJNIfzjcDjKe@cluster0.6vhukcg.mongodb.net/nodeAPI?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to mongoDB  ");
    app.listen(3000, () => {
      console.log("port 3000 ");
    });
  })
  .catch((error) => {
    console.log(error);
  });
