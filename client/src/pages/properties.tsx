// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const Properties = () => {
  const sampleData = [
    {
      reference: "PROP-82669",
      addressLine1: "51 Broughton Street",
      postcode: "SW8 3QU",
      organisation: "Eco Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-82640",
      addressLine1: "1 Holden Street",
      postcode: "SW11 5UW",
      organisation: "Eco Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-78560",
      addressLine1: "53 Victoria Street",
      postcode: "ME12 1YB",
      organisation: "Eco Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-77791",
      addressLine1: "3 Bellhurst Cottages",
      postcode: "TN32 5DN",
      organisation: "Eco Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-77770",
      addressLine1: "17 Orchard Close",
      postcode: "TN34 2BZ",
      organisation: "Eco Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-77750",
      addressLine1: "38 Firle Close",
      postcode: "TN35 5ET",
      organisation: "Eco Approach Ltd",
      tags: "+",
    },
  ];

  return (
    <>
      <TopBar
        title="Properties"
        definition="Create and manage your properties here"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Property" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "reference",
              "addressLine1",
              "postcode",
              "organisation",
              "tags",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Properties;
