// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const SubContractor = () => {
  const sampleData = [
    {
      contractorId: "SUB-20001",
      name: "John Mason Ltd",
      contactPerson: "John Mason",
      phone: "07891 223344",
      trade: "Electrical",
      location: "London",
      status: "Active",
      addedAt: "2025-07-28",
    },
    {
      contractorId: "SUB-20002",
      name: "Bright Build Co.",
      contactPerson: "Laura Bright",
      phone: "07882 556677",
      trade: "Plumbing",
      location: "Manchester",
      status: "On Hold",
      addedAt: "2025-07-26",
    },
    {
      contractorId: "SUB-20003",
      name: "Eco Frame Services",
      contactPerson: "Ali Rehman",
      phone: "07444 998877",
      trade: "Framing",
      location: "Birmingham",
      status: "Inactive",
      addedAt: "2025-07-20",
    },
    {
      contractorId: "SUB-20004",
      name: "Prime Concrete Ltd",
      contactPerson: "Sarah Greene",
      phone: "07333 112233",
      trade: "Concrete",
      location: "Leeds",
      status: "Active",
      addedAt: "2025-07-18",
    },
    {
      contractorId: "SUB-20005",
      name: "HVAC Pros",
      contactPerson: "Tom Evans",
      phone: "07222 334455",
      trade: "HVAC",
      location: "Sheffield",
      status: "Pending",
      addedAt: "2025-07-30",
    },
  ];

  return (
    <>
      <TopBar
        title="Sub-Contractor"
        definition="Manage, send and recieve sub-contractor work"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Sub-Contract" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "contractorId",
              "name",
              "contactPerson",
              "phone",
              "trade",
              "location",
              "status",
              "addedAt",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default SubContractor;
