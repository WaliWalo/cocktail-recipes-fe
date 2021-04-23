import React from "react";
import Landing from "./Landing";
import Loader from "./Loader";
import "./styles.css";
import { IOverlayProps } from "./Types";

function Overlay(props: IOverlayProps) {
  return (
    <div id="overlay">
      {props.type === "landing" ? <Landing /> : <Loader />}
    </div>
  );
}

export default Overlay;
