import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addTask, updateTask } from '../redux/slices/taskSlice';

const TaskForm = ({ editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('pending');
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setAssignedTo(editingTask.assignedTo || '');
      setStatus(editingTask.status);
    } else {
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setStatus('pending');
    }
  }, [editingTask]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, assignedTo, status };
    try {
      if (editingTask) {
        // Update existing task
        const response = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData);
        dispatch(updateTask(response.data));
        setEditingTask(null); // Clear the editing task after update
      } else {
        // Add new task
        const response = await axios.post('http://localhost:5000/api/tasks', taskData);
        dispatch(addTask(response.data));
      }
      // Reset form
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setStatus('pending');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        className="task-input"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="task-input"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="task-select">
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <select className="task-select" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" className="task-button">{editingTask ? 'Update Task' : 'Add Task'}</button>
      {editingTask && <button type="button" onClick={() => setEditingTask(null)} className="task-button">Cancel</button>}
    </form>
  );
};

export default TaskForm;
