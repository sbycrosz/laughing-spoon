import type { Meta, StoryObj } from "@storybook/react";

import Table, { ColumnDef } from "./Table";
import { useState } from "react";

const meta: Meta<typeof Table> = {
  title: "Example/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
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
]
type Entry = typeof data[0];
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
    header: "3G Availability",
    cell: ({ has3G }) => (has3G ? "Yes" : "No"),
  },
];

export const BasicTable: Story = {
  render: () => (
    <Table columnDefs={columnDefs} data={data} />
  )
};

export const TableWithSortableHeader: Story = {
  render: () => (
    <Table columnDefs={[
      ...columnDefs,
      {
        id: "USER_COUNT",
        header: "Users",
        cell: ({ userCount }) => (userCount.toLocaleString()),
        sortable: true,
        comparator: (nodeA, nodeB) => nodeA.userCount - nodeB.userCount,
      },
    ]} data={data} />
  )
};

export const TableWithRadioButton: Story = {
  render: () => {
    const [selection, setSelection] = useState<string[]>([]);

    return (
      <>
        <div className="my-10 px-3 py-5 inline-block rounded border border-slate-300">
          Selected: "{selection.join(', ')}"
        </div>

        <Table
          columnDefs={columnDefs}
          data={data}
          rowSelection='single'
          onSelectionChanged={setSelection} />
      </>
    )
  }
};

export const TableWithCheckbox: Story = {
  render: () => {
    const [selection, setSelection] = useState([]);

    return (
      <>
        <Table columnDefs={columnDefs} data={data} />
      </>
    )
  }
};
