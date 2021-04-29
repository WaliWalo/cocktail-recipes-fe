import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecipe } from "./types";
import { AppDispatch } from "../setup/store";

type SliceState =
  | { status: "loading" }
  | { status: "finished"; data: Array<IRecipe> }
  | { status: "error"; error: object };

const initialState: SliceState = { status: "loading" } as SliceState;

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    setRandomRecipes: (state, action: PayloadAction<Array<IRecipe>>) =>
      (state = { status: "finished", data: action.payload }),
    getSearchedRecipes: (state, action: PayloadAction<string>) => state,
    getFilteredRecipes: (state, action: PayloadAction<string>) => state,
    setError: (state, action: PayloadAction<object>) =>
      (state = { status: "error", error: action.payload }),
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getRandomRecipesAsync = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/cocktails`
    );
    if (response.ok) {
      dispatch(setRandomRecipes(await response.json()));
    } else {
      const error = { status: response.status, message: response.statusText };
      dispatch(setError(error));
    }
  } catch (error) {
    const err = { status: 500, message: "Please try again later" };
    dispatch(setError(err));
  }
};

// Extract the action creators object and the reducer
const { actions, reducer } = recipeSlice;
// Extract and export each action creator by name
export const {
  setRandomRecipes,
  getSearchedRecipes,
  getFilteredRecipes,
  setError,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
