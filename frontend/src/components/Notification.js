import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useNewTasksCount = () => {
  const user = useSelector((state) => state.auth.user);
  const [newTasksCount, setNewTasksCount] = useState(0);

  useEffect(() => {
    const fetchNewTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/new/${user._id}`);
        setNewTasksCount(response.data.length);
      } catch (error) {
        console.error('Error fetching new tasks:', error);
      }
    };

    if (user) {
      fetchNewTasks();
    }
  }, [user]);

  return newTasksCount;
};

export default useNewTasksCount;
