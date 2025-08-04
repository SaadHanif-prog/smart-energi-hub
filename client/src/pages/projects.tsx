// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const Projects = () => {
  const sampleData = [
    {
      reference: "PROJ-10001",
      projectName: "Solar Panel Installation",
      status: "In Progress",
      startDate: "2025-07-01",
      endDate: "2025-08-15",
      client: "SEH Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROJ-10002",
      projectName: "Home Insulation Upgrade",
      status: "Completed",
      startDate: "2025-05-10",
      endDate: "2025-06-20",
      client: "GreenBuild Co.",
      tags: "+",
    },
    {
      reference: "PROJ-10003",
      projectName: "Smart Meter Installation",
      status: "Pending",
      startDate: "2025-08-05",
      endDate: "2025-09-01",
      client: "PowerSmart Ltd",
      tags: "+",
    },
    {
      reference: "PROJ-10004",
      projectName: "Boiler Replacement",
      status: "Cancelled",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      client: "WarmHomes UK",
      tags: "+",
    },
    {
      reference: "PROJ-10005",
      projectName: "EV Charging Point Setup",
      status: "In Progress",
      startDate: "2025-07-15",
      endDate: "2025-08-30",
      client: "ChargeNet Ltd",
      tags: "+",
    },
  ];

  return (
    <>
      <TopBar
        title="Projects"
        definition="Create and manage your projects here"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Project" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "reference",
              "projectName",
              "status",
              "startDate",
              "endDate",
              "client",
              "tags",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Projects;
