import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setTasks } from '../redux/slices/taskSlice';
import Task from './Task';
import TaskForm from './TaskForm';
import Chat from './Chat';
import { FaCommentDots } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        const taskResponse = await axios.get('http://localhost:5000/api/tasks');
        dispatch(setTasks(taskResponse.data));

        const userResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Error fetching tasks and users:', error);
      }
    };
    fetchTasksAndUsers();
  }, [dispatch]);

  const newTasksCount = localStorage.getItem('newTasksCount');

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('newTasksCount');
    navigate('/login');
  };

  const getAssignedUser = (userId) => {
    return users.find(user => user._id === userId);
  };

  const handleChatClick = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className="header">
          <h1>My Task Maker</h1>
          <p>Manage your tasks efficiently and effortlessly</p>
        </div>
        <div className="header-right">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <i className="notification-icon">🔔</i>
            <span className="notification">{newTasksCount !== null ? newTasksCount : '0'}</span>
          </div>
          <FaCommentDots className="chat-icon" onClick={handleChatClick} />
      </div>
      <div className="dashboard-right">
        <div className="dashboard-container">
          <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
          <div className="filter">
            <label>Filter by status: </label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {filteredTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              setEditingTask={setEditingTask}
              assignedUser={getAssignedUser(task.assignedTo)}
            />
          ))}
        </div>
        {showChat && <Chat />}
      </div>
    </div>
  );
};

export default Dashboard;
