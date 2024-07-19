import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter(task => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { setTasks, addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
