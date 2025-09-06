import { createSlice } from "@reduxjs/toolkit";

let parsedUser = null;
try {
  const storedUser = localStorage.getItem("user");
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.warn("Invalid user data in localStorage, clearing...");
  localStorage.removeItem("user");
  parsedUser = null;
}

const initialState = {
  user: parsedUser,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading(state, action) {
      state.loading = action.payload;  // Fixed here
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
