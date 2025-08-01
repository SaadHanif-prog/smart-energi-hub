// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const Leads = () => {
  const sampleData = [
    {
      reference: "LEAD-90001",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "07911 223344",
      status: "New",
      source: "Website",
      createdAt: "2025-07-28",
    },
    {
      reference: "LEAD-90002",
      name: "Tom Davies",
      email: "tom.davies@business.org",
      phone: "07822 556677",
      status: "Contacted",
      source: "Referral",
      createdAt: "2025-07-26",
    },
    {
      reference: "LEAD-90003",
      name: "Emily Singh",
      email: "emily.singh@mail.com",
      phone: "07444 998877",
      status: "Qualified",
      source: "Campaign",
      createdAt: "2025-07-20",
    },
    {
      reference: "LEAD-90004",
      name: "James Lee",
      email: "james.lee@company.co.uk",
      phone: "07333 112233",
      status: "Lost",
      source: "Cold Call",
      createdAt: "2025-07-18",
    },
    {
      reference: "LEAD-90005",
      name: "Olivia Green",
      email: "olivia.green@example.com",
      phone: "07222 334455",
      status: "New",
      source: "Website",
      createdAt: "2025-07-30",
    },
  ];

  return (
    <>
      <TopBar title="Leads" definition="Create and manage your leads here" />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Lead" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "reference",
              "name",
              "email",
              "phone",
              "status",
              "source",
              "createdAt",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Leads;
