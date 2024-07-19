// src/redux/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import taskReducer from '../slices/taskSlice';
import userReducer from '../slices/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    users: userReducer,
  },
});
