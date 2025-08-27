import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
// Modals
import AddJobModal from "../modals/jobs/add-job-modal";
import UpdateJobModal from "../modals/jobs/update-job-modal";
// Hooks
import { useJobs, useAddJob, useUpdateJob, useDeleteJob } from "../hooks/jobs.hook";
import { useLeads } from "../hooks/leads.hook";
// Types
import type { Job, CreateJob, UpdateJob, JobWithRelations } from "../types/jobs.types";
import type { Column } from "../components/common/table";

const JobsPage = () => {
  const { data: jobs, isLoading, isError, error } = useJobs();
  const { mutate: addJob, status: addJobStatus } = useAddJob();
  const { mutate: updateJob, status: updateJobStatus } = useUpdateJob();
  const { mutate: deleteJob } = useDeleteJob();

  const { data: leads } = useLeads();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateJob | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

const filteredJobs = jobs?.filter(job =>
  job.jobType.toLowerCase().includes(searchQuery.toLowerCase()) ||
  job.jobSubType.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  const handleAddJob = (data: CreateJob, resetFields: () => void) => {
    addJob(data, {
      onSuccess: () => {
        toast.success("Job added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdateJob = (data: UpdateJob) => {
    updateJob(data, {
      onSuccess: () => {
        toast.success("Job updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

  const handleDeleteJob = (_id: string) => {
    deleteJob(_id, {
      onSuccess: () => {
        toast.success("Job deleted successfully!");
      },
    });
  };

const jobsWithRelations: JobWithRelations[] =
  filteredJobs as JobWithRelations[];

const flattenedJobs = jobsWithRelations.map((job) => {
  const lead = job.lead;

  return {
    _id: job._id,
    jobType: job.jobType,
    jobSubType: job.jobSubType,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,

    // Lead fields
    lead: lead?._id || "",
    leadReference: lead?.reference,
    leadIndustry: lead?.industry,
    leadSource: lead?.source,

    // Property fields (nested inside lead)
    property: lead?.property?._id || "",
    addressLine1: lead?.property?.addressLine1,
    postcode: lead?.property?.postcode,
    town: lead?.property?.town,
    country: lead?.property?.country,
    administrativeArea: lead?.property?.administrativeArea,
    buildingName: lead?.property?.buildingName,
    buildingNumber: lead?.property?.buildingNumber,
    county: lead?.property?.county,

    // Contact fields (nested inside lead)
    contact: lead?.contact?._id || "",
    contactReference: lead?.contact?.reference,
    title: lead?.contact?.title,
    firstname: lead?.contact?.firstname,
    surname: lead?.contact?.surname,
    email: lead?.contact?.email,
    contactPhone: lead?.contact?.contact,
  };
});


  const columns: Column<any>[] = [
  { key: "jobType", title: "Job Type" },
  { key: "jobSubType", title: "Job SubType" },
  { key: "leadReference", title: "Lead Reference" },
  { key: "leadIndustry", title: "Lead Industry" },
  { key: "leadSource", title: "Lead Source" },
  { key: "addressLine1", title: "Property Address" },
  { key: "postcode", title: "Postcode" },
  { key: "town", title: "Town" },
  { key: "country", title: "Country" },
  { key: "administrativeArea", title: "Administrative Area" },
  { key: "buildingName", title: "Building Name" },
  { key: "buildingNumber", title: "Building Number" },
  { key: "county", title: "County" },
  { key: "contactReference", title: "Contact Reference" },
  { key: "title", title: "Contact Title" },
  { key: "firstname", title: "Contact First Name" },
  { key: "surname", title: "Contact Surname" },
  { key: "email", title: "Contact Email" },
  { key: "contactPhone", title: "Contact Phone" },
];

  if (isLoading) return <Loading page="jobs" />;
  if (isError) return <Error error={error} page="jobs" />;

  return (
    <>
      <TopBar
        title="Jobs"
        definition="Create and manage your jobs here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Job
          </button>
        }
        search={
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search jobs..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primaryDark"
          />
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<Job>
            data={flattenedJobs || []}
            columns={columns}
            actions={{
              edit: row => {
                setInitialDataForUpdate({
                  _id: row._id,
                  jobType: row.jobType,
                  jobSubType: row.jobSubType,
                  lead: row.lead,
                });
                setIsUpdateModalOpen(true);
              },
              delete: row => handleDeleteJob(row._id),
            }}
          />
        </div>
      </main>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddJob}
        isLoading={addJobStatus === "pending"}
        leads={leads}
      />

      {/* Update Job Modal */}
      <UpdateJobModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateJob}
        isLoading={updateJobStatus === "pending"}
        initialData={initialDataForUpdate}
        leads={leads}
      />
    </>
  );
};

export default JobsPage;
