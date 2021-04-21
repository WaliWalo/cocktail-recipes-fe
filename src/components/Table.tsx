import React from "react";
import RenderTableData from "./RenderTableData";
import { TStudent } from "./RenderTableData";
import "./tableStyles.css";
interface ITableProps {
  data?: TStudent[];
}
function Table(props: ITableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Registered Course</th>
          </tr>
        </thead>
        <tbody>
          {props.data ? (
            <RenderTableData data={props.data} />
          ) : (
            <tr>
              <td>No student data available</td>
              <td>No student data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
