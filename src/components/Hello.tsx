import React from "react";
interface IHello {
  name: string;
}
function Hello(props: IHello) {
  return <p>Hello {props.name}!, this is a simple hello world component</p>;
}

export default Hello;
