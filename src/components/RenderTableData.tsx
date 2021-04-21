import React from "react";
interface IRenderTableDataProps {
  data: TStudent[];
}
export type TStudent = {
  name: string;
  course: string;
};
function RenderTableData(props: IRenderTableDataProps) {
  return (
    <>
      {props.data.map((student) => (
        <tr>
          <td>{student.name}</td>
          <td>{student.course}</td>
        </tr>
      ))}
    </>
  );
}

export default RenderTableData;
