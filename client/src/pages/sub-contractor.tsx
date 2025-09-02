import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
// Modals
import AddSubContractorModal from "../modals/sub-contractor/add-subcontractor.modal";
import UpdateSubContractorModal from "../modals/sub-contractor/update-subcontractor.model";
// Hooks
import {
  useSubContractors, useAddSubContractor, useUpdateSubContractor, useDeleteSubContractor} from "../hooks/sub-contractor.hook";
// Types and constant data
import type { SubContractor, CreateSubContractor, UpdateSubContractor} from "../types/sub-contractor.types";
import type { Column } from "../components/common/table";

const SubContractorsPage = () => {
  const { data: subcontractors, isLoading, isError, error } = useSubContractors();
  const { mutate: addSubContractor, status: addStatus } = useAddSubContractor();
  const { mutate: updateSubContractor, status: updateStatus } = useUpdateSubContractor();
  const { mutate: deleteSubContractor } = useDeleteSubContractor();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateSubContractor | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubContractors =
    subcontractors?.filter(
      (sc) =>
        sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.organisationName?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleAdd = (data: CreateSubContractor, resetFields: () => void) => {
    addSubContractor(data, {
      onSuccess: () => {
        toast.success("SubContractor added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdate = (data: UpdateSubContractor) => {
    updateSubContractor(data, {
      onSuccess: () => {
        toast.success("SubContractor updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

  const handleDelete = (_id: string) => {
    deleteSubContractor(_id, {
      onSuccess: () => {
        toast.success("SubContractor deleted successfully!");
      },
    });
  };

  // Columns definition
const columns: Column<SubContractor>[] = [
  { key: "name", title: "Name" },
  { key: "registrationNumber", title: "Registration Number" },
  { key: "organisationName", title: "Organisation Name" },
  { key: "addressLine1", title: "Address Line 1" },
  { key: "addressLine2", title: "Address Line 2" },
  { key: "town", title: "Town" },
  { key: "postcode", title: "Postcode" },
  { key: "country", title: "Country" },
  { key: "eastings", title: "Eastings" },
  { key: "northings", title: "Northings" },
  { key: "latitude", title: "Latitude" },
  { key: "longitude", title: "Longitude" },
  { key: "isRural", title: "Is Rural", render: (row) => (row.isRural ? "Yes" : "No") },
];

  if (isLoading) return <Loading page={"subcontractors"} />;
  if (isError) return <Error error={error} page={"subcontractors"} />;

  return (
    <>
      <TopBar
        title="SubContractors"
        definition="Create and manage your subcontractors here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark border-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Sub Contractor
          </button>
        }
        search={
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subcontractors..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primaryDark"
          />
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<SubContractor>
            data={filteredSubContractors || []}
            columns={columns}
            actions={{
              edit: (row) => {
                setInitialDataForUpdate(row);
                setIsUpdateModalOpen(true);
              },
              delete: (row) => handleDelete(row._id),
            }}
          />
        </div>
      </main>

      {/* Add SubContractor Modal */}
      <AddSubContractorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        isLoading={addStatus === "pending"}
      />

      {/* Update SubContractor Modal */}
      <UpdateSubContractorModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        isLoading={updateStatus === "pending"}
        initialData={initialDataForUpdate}
      />
    </>
  );
};

export default SubContractorsPage;
