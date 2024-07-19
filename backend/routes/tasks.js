const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User'); // Assurez-vous que le modèle User est correctement importé

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    status: req.body.status || 'pending',
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE task status
router.put('/:id/status', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = req.body.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET new tasks for a user since their last login
router.get('/new/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTasks = await Task.find({
      assignedTo: req.params.userId,
      createdAt: { $gte: user.lastLogin }
    });

    res.json(newTasks);
  } catch (err) {
    console.error('Error fetching new tasks:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
