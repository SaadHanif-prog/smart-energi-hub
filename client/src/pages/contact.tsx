// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const Contact = () => {
  const sampleData = [
    {
      reference: "CON-113816",
      title: "Mr",
      name: "Augusta",
      surname: "Gyamfi",
      phone: "07947 783758",
      email: "AUGUSTAGYAMFI@YAHOO.COM",
      notes: "",
    },
    {
      reference: "CON-113778",
      title: "Mr",
      name: "Graham Arthur",
      surname: "Sines",
      phone: "07928 118077",
      email: "g.sines050@btinternet.com",
      notes: "",
    },
    {
      reference: "CON-113079",
      title: "-",
      name: "-",
      surname: "-",
      phone: "-",
      email: "-",
      notes: "-",
    },
    {
      reference: "CON-112386",
      title: "-",
      name: "-",
      surname: "-",
      phone: "-",
      email: "-",
      notes: "-",
    },
    {
      reference: "CON-109388",
      title: "Miss",
      name: "M",
      surname: "Frostick",
      phone: "07521 504441",
      email: "-",
      notes: "-",
    },
    {
      reference: "CON-109361",
      title: "-",
      name: "-",
      surname: "-",
      phone: "-",
      email: "-",
      notes: "-",
    },
  ];

  return (
    <>
      <TopBar
        title="Contact"
        definition="Create and manage your contacts here"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Contact" />

          {/* Table */}
          <Table
            data={sampleData}
            visibleColumns={[
              "reference",
              "title",
              "name",
              "surname",
              "phone",
              "email",
              "notes",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Contact;
