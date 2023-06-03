import Table from "./Table";

function App() {
  return (
    <Table
      columnDefs={[
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
      ]}
      data={[
        {
          id: "10001",
          operator: "Celcom Axiata (LTE)",
          headset: "Celcom / My Celcom",
          has3G: true,
        },
        {
          id: "10002",
          operator: "DiGi Telecom (LTE)",
          headset: "DiGi 1800 / DiGi",
          has3G: true,
        },
        {
          id: "10003",
          operator: "Maxis",
          headset: "U Mobile / MY 18",
          has3G: false,
        },
      ]}
    />
  );
}

export default App;
