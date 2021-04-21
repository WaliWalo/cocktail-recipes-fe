import React from "react";
import Table from "../components/Table";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "Table component",
  component: Table,
  decorators: [withKnobs],
};

const data = [
  {
    name: "Abdulazeez Abdulazeez",
    course: "Water Resources and Environmental Engineering",
  },
  { name: "Albert Einstein", course: "Physics" },
  { name: "John Doe", course: "Estate Managment" },
  { name: "Sigismund Freud", course: "Neurology" },
  { name: "Leonhard Euler", course: "Mathematics" },
  { name: "Ben Carson", course: "Neurosurgery" },
];
export function ShowStudentsData() {
  return <Table data={object("data", data)} />;
}
export function EmptyData() {
  return <Table />;
}
