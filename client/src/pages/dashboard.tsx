// Components
import TopBar from "../components/common/topbar";
import DashboardCard from "../components/dashboard/dashboard";
import Map from "../components/dashboard/map";

const Dashboard = () => {
  return (
    <>
      <TopBar title="Dashboard" definition="Welcome back, Rahul Sathyan" />
      <div
        className="h-screen flex flex-col"
        style={{ height: "calc(100vh - 140px)" }}
      >
        <div className="flex-1">
          <Map />
        </div>

        <div className="flex gap-x-2 px-6 mb-2">
          <DashboardCard
            title="Leads"
            total={1917}
            stats={[
              { label: "Lead", value: 1 },
              { label: "Pre-install", value: 990, color: "text-teal-700" },
              { label: "Post-install", value: 0, color: "text-teal-700" },
            ]}
          />

          <DashboardCard
            title="Jobs"
            total={999}
            stats={[
              { label: "Pre-install", value: 508, color: "text-teal-700" },
              { label: "Post-install", value: 98, color: "text-teal-700" },
            ]}
          />

          <DashboardCard
            title="Appointments"
            total={1032}
            stats={[
              { label: "Booked", value: 16, color: "text-teal-800" },
              { label: "Cancelled", value: 544, color: "text-yellow-500" },
              { label: "Rejected", value: 42, color: "text-red-600" },
            ]}
          />

          <DashboardCard
            title="Data match"
            total={116}
            stats={[
              { label: "Manual", value: 116, color: "text-blue-800" },
              { label: "Requested", value: 0, color: "text-blue-600" },
              { label: "Cancelled", value: 0, color: "text-red-600" },
              { label: "Submitted", value: 0 },
              { label: "Unverified", value: 0, color: "text-yellow-500" },
              {
                label: "Unmatched (verified)",
                value: 0,
                color: "text-red-500",
              },
              { label: "Matched", value: 0, color: "text-green-600" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
