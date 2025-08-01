// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import Table from "../components/common/table";

const Jobs = () => {
  const sampleData = [
    {
      jobId: "JOB-10001",
      title: "Software Engineer",
      department: "Engineering",
      location: "London",
      status: "Open",
      postedBy: "Careers Website",
      postedAt: "2025-07-28",
    },
    {
      jobId: "JOB-10002",
      title: "Marketing Manager",
      department: "Marketing",
      location: "Manchester",
      status: "Interviewing",
      postedBy: "Recruiter",
      postedAt: "2025-07-26",
    },
    {
      jobId: "JOB-10003",
      title: "Data Analyst",
      department: "Data Science",
      location: "Remote",
      status: "Closed",
      postedBy: "Job Portal",
      postedAt: "2025-07-20",
    },
    {
      jobId: "JOB-10004",
      title: "UX Designer",
      department: "Design",
      location: "Birmingham",
      status: "Open",
      postedBy: "Referral",
      postedAt: "2025-07-18",
    },
    {
      jobId: "JOB-10005",
      title: "Product Manager",
      department: "Product",
      location: "Leeds",
      status: "Draft",
      postedBy: "Careers Website",
      postedAt: "2025-07-30",
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
              "jobId",
              "title",
              "department",
              "location",
              "status",
              "postedBy",
              "postedAt",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Jobs;
