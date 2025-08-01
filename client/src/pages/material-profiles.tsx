// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const MaterialProfile = () => {
  const sampleData = [
    {
      materialId: "MAT-30001",
      name: "Concrete - Grade M30",
      category: "Concrete",
      unit: "Cubic Meter",
      supplier: "Prime Concrete Ltd",
      cost: 75.0,
      availability: "In Stock",
      addedAt: "2025-07-28",
    },
    {
      materialId: "MAT-30002",
      name: "Steel Rebars - TMT 12mm",
      category: "Steel",
      unit: "Ton",
      supplier: "SteelWorks Inc.",
      cost: 620.0,
      availability: "Low Stock",
      addedAt: "2025-07-26",
    },
    {
      materialId: "MAT-30003",
      name: "Plywood Sheet 18mm",
      category: "Wood",
      unit: "Sheet",
      supplier: "Eco Frame Services",
      cost: 18.5,
      availability: "In Stock",
      addedAt: "2025-07-20",
    },
    {
      materialId: "MAT-30004",
      name: "Copper Wiring 4mm",
      category: "Electrical",
      unit: "Roll",
      supplier: "Bright Build Co.",
      cost: 45.0,
      availability: "Out of Stock",
      addedAt: "2025-07-18",
    },
    {
      materialId: "MAT-30005",
      name: "PVC Pipes 6 inch",
      category: "Plumbing",
      unit: "Piece",
      supplier: "HVAC Pros",
      cost: 9.75,
      availability: "In Stock",
      addedAt: "2025-07-30",
    },
  ];

  return (
    <>
      <TopBar
        title="Material Profiles"
        definition="Add or manage your material profiles here"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Material Profile" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "materialId",
              "name",
              "category",
              "unit",
              "supplier",
              "cost",
              "availability",
              "addedAt",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default MaterialProfile;
