import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
// Modals
import AddMaterialProfileModal from "../modals/material-profiles/add-materialprofile.model";
import UpdateMaterialProfileModal from "../modals/material-profiles/update-materialprofile.model";
// Hooks
import {useMaterialProfiles, useAddMaterialProfile, useUpdateMaterialProfile, useDeleteMaterialProfile} from "../hooks/material-profiles.hook";
// Types and constant data 
import type { MaterialProfile, CreateMaterialProfile, UpdateMaterialProfile } from "../types/material-profile.types";
import {columns} from "../types/material-profile.types"

const MaterialProfilesPage = () => {
  const { data: profiles, isLoading, isError, error } = useMaterialProfiles();
  const { mutate: addProfile, status: addStatus } = useAddMaterialProfile();
  const { mutate: updateProfile, status: updateStatus } = useUpdateMaterialProfile();
  const { mutate: deleteProfile } = useDeleteMaterialProfile();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateMaterialProfile | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = profiles?.filter(
    (p) =>
      p.improvementType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.model?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAdd = (data: CreateMaterialProfile, resetFields: () => void) => {
    addProfile(data, {
      onSuccess: () => {
        toast.success("Material Profile added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdate = (data: UpdateMaterialProfile) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success("Material Profile updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

  const handleDelete = (_id: string) => {
    deleteProfile(_id, {
      onSuccess: () => {
        toast.success("Material Profile deleted successfully!");
      },
    });
  };



  if (isLoading) return <Loading page={"material-profiles"} />;
  if (isError) return <Error error={error} page={"material-profiles"} />;

  return (
    <>
      <TopBar
        title="Material Profiles"
        definition="Create and manage material profiles here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark border-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Material Profile
          </button>
        }
        search={
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search material profiles..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primaryDark"
          />
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<MaterialProfile>
            data={filteredProfiles || []}
            columns={columns}
            actions={{
              edit: (row: MaterialProfile) => {
                setInitialDataForUpdate({
                  _id: row._id,
                  improvementType: row.improvementType,
                  type: row.type,
                  manufacturer: row.manufacturer,
                  model: row.model,
                  modelQualifier: row.modelQualifier,
                  pcdfId: row.pcdfId,
                  subType: row.subType,
                  combinationBoiler: row.combinationBoiler,
                  isdefault: row.isdefault,
                  manufacturerInformation: row.manufacturerInformation as string || null, 
                });
                setIsUpdateModalOpen(true);
              },

              delete: (row) => handleDelete(row._id),
            }}
          />
        </div>
      </main>

      {/* Add Modal */}
      <AddMaterialProfileModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        isLoading={addStatus === "pending"}
      />

      {/* Update Modal */}
      <UpdateMaterialProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        isLoading={updateStatus === "pending"}
        initialData={initialDataForUpdate}
      />
    </>
  );
};

export default MaterialProfilesPage;
