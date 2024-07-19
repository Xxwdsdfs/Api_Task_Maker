// src/components/Task.js
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeTask, updateTask } from '../redux/slices/taskSlice';

const Task = ({ task, setEditingTask, assignedUser }) => {
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
      dispatch(removeTask(task._id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = () => {
    setEditingTask(task);
  };

  const handleStatusChange = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}/status`, { status: newStatus });
      dispatch(updateTask(response.data));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Assigned to: <span className="assigned-user">{assignedUser ? assignedUser.name : 'Unassigned'}</span></p>
      <p className="task-status">Status: <span className={`status ${task.status}`}>{task.status}</span></p>
      <div className="task-actions">
        <button className="edit" onClick={handleEdit}>Edit</button>
        <button className="delete" onClick={handleRemove}>Delete</button>
        <button onClick={handleStatusChange}>
          {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
      </div>
    </div>
  );
};

export default Task;
