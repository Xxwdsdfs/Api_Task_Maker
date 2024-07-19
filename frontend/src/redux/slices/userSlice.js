import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'User One' },
  { id: '2', name: 'User Two' },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
