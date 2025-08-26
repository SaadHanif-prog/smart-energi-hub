import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
// Modals
import AddLeadModal from "../modals/leads/add-lead-modal";
import UpdateLeadModal from "../modals/leads/update-lead-modal";
// Hooks
import { useLeads, useAddLead, useUpdateLead, useDeleteLead } from "../hooks/leads.hook";
// Types
import type { Lead, CreateLead, UpdateLead } from "../types/leads.types";
import type { Column } from "../components/common/table";

const LeadsPage = () => {
  const { data: leads, isLoading, isError, error } = useLeads();
  const { mutate: addLead, status: addLeadStatus } = useAddLead();
  const { mutate: updateLead, status: updateLeadStatus } = useUpdateLead();
  const { mutate: deleteLead } = useDeleteLead();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateLead | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads?.filter(lead =>
    lead.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddLead = (data: CreateLead, resetFields: () => void) => {
    addLead(data, {
      onSuccess: () => {
        toast.success("Lead added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdateLead = (data: UpdateLead) => {
    updateLead(data, {
      onSuccess: () => {
        toast.success("Lead updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

  const handleDeleteLead = (_id: string) => {
    deleteLead(_id, {
      onSuccess: () => {
        toast.success("Lead deleted successfully!");
      },
    });
  };

  // Columns definition
  const columns: Column<Lead>[] = [
    { key: "reference", title: "Reference" },
    { key: "industry", title: "Industry" },
    { key: "source", title: "Source" },
  ];

  if (isLoading) return <Loading page={"leads"} />;
  if (isError) return <Error error={error} page={"leads"} />;

  return (
    <>
      <TopBar
        title="Leads"
        definition="Create and manage your leads here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Lead
          </button>
        }
        search={
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primaryDark"
          />
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<Lead>
            data={filteredLeads || []}
            columns={columns}
            actions={{
              edit: (row) => {
                setInitialDataForUpdate(row);
                setIsUpdateModalOpen(true);
              },
              delete: (row) => handleDeleteLead(row._id),
            }}
          />
        </div>
      </main>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddLead}
        isLoading={addLeadStatus === "pending"}
      />

      {/* Update Lead Modal */}
      <UpdateLeadModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateLead}
        isLoading={updateLeadStatus === "pending"}
        initialData={initialDataForUpdate}
      />
    </>
  );
};

export default LeadsPage;
