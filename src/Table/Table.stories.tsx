import type { Meta, StoryObj } from "@storybook/react";

import Table, { ColumnDef } from "./Table";
import { useState } from "react";

const meta: Meta<typeof Table> = {
  title: "Example/Table",
  component: Table,
  parameters: {
    layout: "padded",
    controls: { hideNoControlsWarning: true },
  },
  argTypes: { onSelectionChanged: { action: "selectionChanged" } },
};

export default meta;
type Story = StoryObj<typeof Table>;

const data = [
  {
    id: "10001",
    operator: "Celcom Axiata (LTE)",
    headset: "Celcom / My Celcom",
    has3G: true,
    userCount: 5000000,
  },
  {
    id: "10002",
    operator: "DiGi Telecom (LTE)",
    headset: "DiGi 1800 / DiGi",
    has3G: true,
    userCount: 4000000,
  },
  {
    id: "10003",
    operator: "Maxis",
    headset: "U Mobile / MY 18",
    has3G: false,
    userCount: 6000000,
  },
];
type Entry = (typeof data)[0];
const columnDefs: ColumnDef<Entry>[] = [
  {
    id: "OPERATOR",
    header: "Operator",
    cell: ({ operator }) => operator,
  },
  {
    id: "HEADSET",
    header: "Headset",
    cell: ({ headset }) => headset,
  },
  {
    id: "HAS_3G",
    header: "Has 3G",
    cell: ({ has3G }) => (has3G ? "Yes" : "No"),
  },
];

export const BasicTable: Story = {
  render: () => <Table columnDefs={columnDefs} data={data} />,
};

export const TableWithSortableHeader: Story = {
  render: () => (
    <Table
      columnDefs={[
        {
          id: "OPERATOR",
          header: "Operator",
          cell: ({ operator }) => operator,
          sortable: true,
          comparator: (nodeA, nodeB) =>
            nodeA.operator.localeCompare(nodeB.operator),
        },
        {
          id: "HEADSET",
          header: "Headset",
          cell: ({ headset }) => headset,
          sortable: true,
          comparator: (nodeA, nodeB) =>
            nodeA.headset.localeCompare(nodeB.headset),
        },
        {
          id: "HAS_3G",
          header: "Has 3G",
          cell: ({ has3G }) => (has3G ? "Yes" : "No"),
          sortable: true,
          // Exciting boolean compare function ahead!
          comparator: (nodeA, nodeB) => +nodeA.has3G - +nodeB.has3G,
        },
        {
          id: "USER_COUNT",
          header: "Users",
          cell: ({ userCount }) => userCount.toLocaleString(),
          sortable: true,
          comparator: (nodeA, nodeB) => nodeA.userCount - nodeB.userCount,
        },
      ]}
      data={data}
    />
  ),
};

export const TableWithRadioButton: Story = {
  render: (props) => (
    <Table
      columnDefs={columnDefs}
      data={data}
      rowSelection="single"
      onSelectionChanged={props.onSelectionChanged}
    />
  ),
};

export const TableWithCheckbox: Story = {
  render: (props) => (
    <Table
      columnDefs={columnDefs}
      data={data}
      rowSelection="multiple"
      onSelectionChanged={props.onSelectionChanged}
    />
  ),
};

export const Responsive1: Story = {
  name: "(Responsive) Table with more than 3 fields",
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  render: (props) => (
    <Table
      columnDefs={[
        ...columnDefs,
        {
          id: "USER_COUNT",
          header: "Users",
          cell: ({ userCount }) => userCount.toLocaleString(),
          sortable: true,
          comparator: (nodeA, nodeB) => nodeA.userCount - nodeB.userCount,
        },
      ]}
      data={data}
      rowSelection="multiple"
      onSelectionChanged={props.onSelectionChanged}
    />
  ),
};

export const Responsive2: Story = {
  name: "(Responsive) Table at most 3 fields",
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  render: (props) => (
    <Table
      columnDefs={columnDefs}
      data={data}
      rowSelection="single"
      onSelectionChanged={props.onSelectionChanged}
    />
  ),
};
