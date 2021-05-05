import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuery, IRecipe, ISearchResult } from "./types";
import { AppDispatch } from "../setup/store";
import { RootStateOrAny } from "react-redux";

type SliceState =
  | { status: "loading" }
  | { status: "finished"; data: Array<IRecipe>; query: Array<ISearchResult> }
  | { status: "error"; error: object };

const initialState: SliceState = { status: "loading" } as SliceState;

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Array<IRecipe>>) =>
      (state = { status: "finished", data: action.payload, query: [] }),
    setFilteredRecipes: (state, action: PayloadAction<Array<ISearchResult>>) =>
      (state = { status: "finished", query: action.payload, data: [] }),
    setError: (state, action: PayloadAction<object>) =>
      (state = { status: "error", error: action.payload }),
    setLoading: (state) => (state = { status: "loading" }),
  },
});

// The function below is called a thunk and allows us to perform async logic.
export const getRandomRecipesAsync = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/cocktails`
    );
    if (response.ok) {
      dispatch(setRecipes(await response.json()));
    } else {
      const error = { status: response.status, message: response.statusText };
      dispatch(setError(error));
    }
  } catch (error) {
    const err = { status: 500, message: "Please try again later" };
    dispatch(setError(err));
  }
};

export const getSearchedRecipesAsync = (query: IQuery) => async (
  dispatch: AppDispatch
) => {
  dispatch(setLoading());
  try {
    let url = "";
    if (query.type === "Cocktail") {
      url = `${process.env.REACT_APP_BE_URL}/api/cocktails/search/${query.query}`;
    } else if (query.type === "Ingredient") {
      url = `${process.env.REACT_APP_BE_URL}/api/cocktails/filter?i=${query.query}`;
    } else if (query.type === "Id") {
      url = `${process.env.REACT_APP_BE_URL}/api/cocktails/lookupCocktail/${query.query}`;
    } else {
      url = `${process.env.REACT_APP_BE_URL}/api/cocktails/filter?g=${query.query}`;
    }
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.drinks !== undefined) {
        dispatch(setRecipes(data.drinks));
      } else {
        dispatch(setFilteredRecipes(data));
      }
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
export const { setRecipes, setFilteredRecipes, setError, setLoading } = actions;

export const selectDrinks = (state: RootStateOrAny) => state.recipe.data;
export const selectQueries = (state: RootStateOrAny) => state.recipe.query;

// Export the reducer, either as a default or named export
export default reducer;
