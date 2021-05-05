import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Lists from "../../components/Lists/Lists";
import { Provider } from "react-redux";
import store from "../../store/setup/store";

export default {
  title: "Lists",
  component: Lists,
};

export function ListsMain() {
  return <Lists />;
}
