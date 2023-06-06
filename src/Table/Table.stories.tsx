import type { Meta, StoryObj } from "@storybook/react";
import "react";
import Table, { TableProps } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Example/Table",
  component: Table,
  argTypes: { onSelectionChanged: { action: "selectionChanged" } },
};

export default meta;

interface SampleEntry {
  id: string;
  operator: string;
  headset: string;
  has3G: boolean;
  userCount: number;
}

type Story = StoryObj<TableProps<SampleEntry>>;

export const BasicTable: Story = {
  args: {
    data: [
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
    ],
    columnDefs: [
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
    ],
  },
};

export const TableWithSortableHeader: Story = {
  args: {
    data: [
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
    ],
    columnDefs: [
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
    ],
  },
};

export const TableWithRadioButton: Story = {
  args: {
    rowSelection: "single",
    data: [
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
    ],
    columnDefs: [
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
    ],
  },
};

export const TableWithCheckbox: Story = {
  args: {
    rowSelection: "multiple",
    data: [
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
    ],
    columnDefs: [
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
    ],
  },
};

export const Responsive1: Story = {
  name: "(Responsive) Table with more than 3 fields",
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: {
    rowSelection: "single",
    data: [
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
    ],
    columnDefs: [
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
      {
        id: "USER_COUNT",
        header: "Users",
        cell: ({ userCount }) => userCount.toLocaleString(),
        sortable: true,
      },
    ],
  },
};

export const Responsive2: Story = {
  name: "(Responsive) Table at most 3 fields",
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
  args: {
    rowSelection: "multiple",
    data: [
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
    ],
    columnDefs: [
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
    ],
  },
};
