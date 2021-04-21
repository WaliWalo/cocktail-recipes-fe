import React from "react";
interface ILoadingProps {
  isLoading: boolean;
}
function IsLoading(props: ILoadingProps) {
  return <div>{props.isLoading ? "Loading" : "Not Loading"}</div>;
}

export default IsLoading;
