const Task = require('../models/task.model');


const createTask = async (req, res) => {
    console.log("Creating task with data:", req.user);
    const { title, description, status ,dueDate,category,Priority,Project} = req.body;
    const userId = req.user.user_id;
    const task = new Task({ title, description, status, userId, dueDate, category,Priority,Project });
    await task.save();
    res.status(201).json(task);
};

const getTasks = async (req, res) => {
   try{
       const {search ,sort}=req.query;

    let query = {};
    let sortObj = { createdAt: -1 };

    // === SEARCH ===
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // === SORTING ===
    if (sort) {
      switch (sort) {
        case 'title-asc':
          sortObj = { title: 1 };
          break;
        case 'title-desc':
          sortObj = { title: -1 };
          break;
        case 'due-asc':
          sortObj = { dueDate: 1 };
          break;
        case 'due-desc':
          sortObj = { dueDate: -1 };
          break;
        default:
          sortObj = { createdAt: -1 };
      }
    }

    const userId = req.user.user_id;
    const tasks = await Task.find(query).sort(sortObj);
    
    res.json({ success: true, data: tasks });
   }
   catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.user_id;
    const task = await Task.findOneAndUpdate({ _id: id, userId }, { title, description, status }, { new: true });
    res.status(200).json(task);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.user_id;
    await Task.findOneAndDelete({ _id: id, userId });
    res.status(204).send();
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.user_id;
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
}






module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskById };