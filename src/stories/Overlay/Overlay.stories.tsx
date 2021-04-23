import React from "react";
import Overlay from "../../components/Overlay/Overlay";
export default {
  title: "Overlay",
  component: Overlay,
};

export function OverlayLanding() {
  return <Overlay type="landing" />;
}

export function OverlayLoader() {
  return <Overlay type="loader" />;
}
