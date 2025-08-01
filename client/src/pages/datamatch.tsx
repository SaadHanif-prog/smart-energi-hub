// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const DataMatch = () => {
  const sampleData = [
    {
      matchId: "DM-40001",
      submissionName: "Job Import - July",
      sourceSystem: "BuilderTrend",
      matchedRecords: 124,
      unmatchedRecords: 6,
    },
    {
      matchId: "DM-40002",
      submissionName: "Material Sync - Phase 1",
      sourceSystem: "Procore",
      matchedRecords: 98,
      unmatchedRecords: 12,
    },
    {
      matchId: "DM-40003",
      submissionName: "Contractor Upload",
      sourceSystem: "Excel Upload",
      matchedRecords: 45,
      unmatchedRecords: 3,
    },
    {
      matchId: "DM-40004",
      submissionName: "Job Import - Legacy",
      sourceSystem: "Custom API",
      matchedRecords: 0,
      unmatchedRecords: 200,
    },
    {
      matchId: "DM-40005",
      submissionName: "Sub-Contractor Sync",
      sourceSystem: "Airtable",
      matchedRecords: 76,
      unmatchedRecords: 0,
    },
  ];

  return (
    <>
      <TopBar
        title="Data Match"
        definition="View your data match submission statuses here"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Data Match" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "matchId",
              "submissionName",
              "sourceSystem",
              "matchedRecords",
              "unmatchedRecords",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default DataMatch;
