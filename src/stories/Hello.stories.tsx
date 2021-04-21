import React from "react";
import Hello from "../components/Hello";
import IsLoading from "./../components/IsLoading";

export default {
  title: "Hello Story",
  component: Hello,
};

export function HelloJoe() {
  return <Hello name="Joe" />;
}

export function TestUser() {
  return <Hello name="Test User" />;
}

export function NotLoading() {
  return <IsLoading isLoading={false} />;
}

export function Loading() {
  return <IsLoading isLoading={true} />;
}
