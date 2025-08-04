// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const Jobs = () => {
  const sampleData = [
    {
      Reference: "JOB-10001",
      Property: "Engineering HQ",
      "Address Line 1": "123 Tech Street",
      Postcode: "E1 6AN",
      "Job type": "Electric storage heaters",
      "Job sub type": "Upgrade of an inefficient heater",
    },
    {
      Reference: "JOB-10002",
      Property: "Marketing Division",
      "Address Line 1": "45 Market Ave",
      Postcode: "M1 3HE",
      "Job type": "Electric storage heaters",
      "Job sub type": "Upgrade of an inefficient heater",
    },
    {
      Reference: "JOB-10003",
      Property: "Remote Team",
      "Address Line 1": "N/A",
      Postcode: "N/A",
      "Job type": "Electric storage heaters",
      "Job sub type": "Upgrade of an inefficient heater",
    },
    {
      Reference: "JOB-10004",
      Property: "Design Studio",
      "Address Line 1": "78 Creative Blvd",
      Postcode: "B1 1AA",
      "Job type": "Cavity Wall Insulation",
      "Job sub type": "Upgrade of an inefficient heater",
    },
    {
      Reference: "JOB-10005",
      Property: "Product Office",
      "Address Line 1": "12 Strategy Road",
      Postcode: "LS1 4DT",
      "Job type": "Cavity Wall Insulation",
      "Job sub type": "Upgrade of an inefficient heater",
    },
  ];

  return (
    <>
      <TopBar title="Jobs" definition="Create and manage your jobs here" />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Job" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "Reference",
              "Property",
              "Address Line 1",
              "Postcode",
              "Job type",
              "Job sub type",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Jobs;
