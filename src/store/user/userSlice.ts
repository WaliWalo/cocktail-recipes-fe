import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../setup/store";
import { IUser } from "./types";

type UserState =
  | { loggedIn: false }
  | { loggedIn: true; user: IUser; status: "finished" }
  | { status: "loading" }
  | { status: "error"; error: string };

const initialState: UserState = { loggedIn: false } as UserState;

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) =>
      (state = { status: "finished", loggedIn: true, user: action.payload }),
    setError: (state, action: PayloadAction<string>) =>
      (state = { status: "error", error: action.payload }),
    setLoading: (state) => (state = { status: "loading" }),
    removeFromFav: (state) => state,
    unsetUser: (state) => (state = { loggedIn: false }),
  },
});

export const login = (email: string, password: string) => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading());
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const user = await response.json();
      if (user.status === "Error") {
        dispatch(setError(user.message));
      } else {
        localStorage.setItem("loggedIn", user._id);
        dispatch(setUser(user));
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

export const registerUser = (credentials: IUser) => async (
  dispatch: AppDispatch
) => {
  try {
    delete credentials._id;
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const user = await response.json();
      if (user.errors) {
        dispatch(setError(user.message));
      } else {
        localStorage.setItem("loggedIn", user._id);
        dispatch(setUser(user));
      }
    } else {
      const error = await response.json();
      dispatch(setError(error.message));
    }
  } catch (error) {
    console.log("ERROR", error);
    dispatch(setError(error));
  }
};

export const getUserById = (userId: string) => async (
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/users/${userId}`
    );
    if (response.ok) {
      dispatch(setUser(await response.json()));
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

export const addFav = (userId: string, recipeId: string) => async (
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/cocktails/favourite/${userId}/${recipeId}`,
      { method: "PUT", credentials: "include" }
    );
    if (response.ok) {
      dispatch(getUserById(userId));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

export const removeFav = (userId: string, recipeId: string) => async (
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/cocktails/favourite/${userId}/${recipeId}`,
      { method: "DELETE", credentials: "include" }
    );
    if (response.ok) {
      dispatch(getUserById(userId));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.status === "ok") {
        localStorage.clear();
        dispatch(unsetUser());
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { setUser, setLoading, setError, unsetUser } = actions;

export default reducer;
