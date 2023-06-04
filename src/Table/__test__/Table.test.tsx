/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { act, queryAllByTestId, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Table, { ColumnDef } from "../Table";

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
        id: "USER_COUNT",
        header: "Users",
        cell: ({ userCount }) => userCount.toLocaleString(),
        sortable: true,
        comparator: (nodeA, nodeB) => nodeA.userCount - nodeB.userCount,
    },
];

describe("Table", () => {
    it("should render a table given data and column definitions", async () => {
        const { baseElement } = render(
            <Table columnDefs={columnDefs} data={data} />
        );

        expect(baseElement).toHaveTextContent(
            [
                ["Operator", "Headset", "Users"],
                ["Celcom Axiata (LTE)", "Celcom / My Celcom", "5,000,000"],
                ["DiGi Telecom (LTE)", "DiGi 1800 / DiGi", "4,000,000"],
                ["Maxis", "U Mobile / MY 18", "6,000,000"],
            ]
                .flat()
                .join("")
        );
    });

    it("should render a sortable table", async () => {
        const user = userEvent.setup();

        const { baseElement, getByTestId } = render(
            <Table columnDefs={columnDefs} data={data} />
        );
        expect(baseElement).toHaveTextContent(
            [
                ["Operator", "Headset", "Users"],
                ["Celcom Axiata (LTE)", "Celcom / My Celcom", "5,000,000"],
                ["DiGi Telecom (LTE)", "DiGi 1800 / DiGi", "4,000,000"],
                ["Maxis", "U Mobile / MY 18", "6,000,000"],
            ]
                .flat()
                .join("")
        );

        // First click should sort with direction ascending
        await act(() => user.click(getByTestId("SORT-USER_COUNT")));
        expect(baseElement).toHaveTextContent(
            [
                ["Operator", "Headset", "Users"],
                ["DiGi Telecom (LTE)", "DiGi 1800 / DiGi", "4,000,000"],
                ["Celcom Axiata (LTE)", "Celcom / My Celcom", "5,000,000"],
                ["Maxis", "U Mobile / MY 18", "6,000,000"],
            ]
                .flat()
                .join("")
        );

        // Next click should sort with direction descending
        await act(() => user.click(getByTestId("SORT-USER_COUNT")));
        expect(baseElement).toHaveTextContent(
            [
                ["Operator", "Headset", "Users"],
                ["Maxis", "U Mobile / MY 18", "6,000,000"],
                ["Celcom Axiata (LTE)", "Celcom / My Celcom", "5,000,000"],
                ["DiGi Telecom (LTE)", "DiGi 1800 / DiGi", "4,000,000"],
            ]
                .flat()
                .join("")
        );

        // Next click should remove sorting
        await act(() => user.click(getByTestId("SORT-USER_COUNT")));
        expect(baseElement).toHaveTextContent(
            [
                ["Operator", "Headset", "Users"],
                ["Celcom Axiata (LTE)", "Celcom / My Celcom", "5,000,000"],
                ["DiGi Telecom (LTE)", "DiGi 1800 / DiGi", "4,000,000"],
                ["Maxis", "U Mobile / MY 18", "6,000,000"],
            ]
                .flat()
                .join("")
        );
    });

    it("should call onSelectionChanged callback with single id", async () => {
        const user = userEvent.setup();

        const onSelectionChanged = jest.fn();

        const { getByText, queryAllByTestId } = render(
            <Table
                columnDefs={columnDefs}
                data={data}
                rowSelection="single"
                onSelectionChanged={onSelectionChanged}
            />
        );

        await act(() => user.click(getByText("DiGi Telecom (LTE)")));
        expect(queryAllByTestId("SELECTED").length).toEqual(1);
        expect(onSelectionChanged).toHaveBeenLastCalledWith(["10002"]);

        // Radio button should only have 1 items selected at all time
        await act(() => user.click(getByText("Maxis")));
        expect(queryAllByTestId("SELECTED").length).toEqual(1);
        expect(onSelectionChanged).toHaveBeenLastCalledWith(["10003"]);

        // Clicking the same item should deselect the item
        await act(() => user.click(getByText("Maxis")));
        expect(queryAllByTestId("SELECTED").length).toEqual(0);
        expect(onSelectionChanged).toHaveBeenLastCalledWith([]);
    });

    it("should call onSelectionChanged callback with multiple-ids on rowSelection=single", async () => {
        const user = userEvent.setup();

        const onSelectionChanged = jest.fn();

        const { getByText, queryAllByTestId } = render(
            <Table
                columnDefs={columnDefs}
                data={data}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
            />
        );

        await act(() => user.click(getByText("DiGi Telecom (LTE)")));
        expect(queryAllByTestId("SELECTED").length).toEqual(1);
        expect(onSelectionChanged).toHaveBeenLastCalledWith(["10002"]);

        await act(() => user.click(getByText("Maxis")));
        expect(queryAllByTestId("SELECTED").length).toEqual(2);
        expect(onSelectionChanged).toHaveBeenLastCalledWith(["10002", "10003"]);

        await act(() => user.click(getByText("Maxis")));
        expect(queryAllByTestId("SELECTED").length).toEqual(1);
        expect(onSelectionChanged).toHaveBeenLastCalledWith(["10002"]);
    });
});
