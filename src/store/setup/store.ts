import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import recipeReducer from "../recipe/recipeSlice";
const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
