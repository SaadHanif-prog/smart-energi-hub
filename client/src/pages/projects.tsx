import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
// Modals
import AddProjectModal from "../modals/projects/add-project-modal";
import UpdateProjectModal from "../modals/projects/update-project-modal";
// Hooks
import { useProjects, useAddProject, useUpdateProject, useDeleteProject } from "../hooks/projects.hook";
// Types and constant data
import type { Project, CreateProject, UpdateProject } from "../types/projects.types";
import {columns} from "../types/projects.types"

const ProjectsPage = () => {
  const { data: projects, isLoading, isError, error } = useProjects();
  const { mutate: addProject, status: addProjectStatus } = useAddProject();
  const { mutate: updateProject, status: updateProjectStatus } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateProject | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects?.filter(project =>
    project.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.organisation?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddProject = (data: CreateProject, resetFields: () => void) => {
    addProject(data, {
      onSuccess: () => {
        toast.success("Project added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdateProject = (data: UpdateProject) => {
    updateProject(data, {
      onSuccess: () => {
        toast.success("Project updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

  const handleDeleteProject = (_id: string) => {
    deleteProject(_id, {
      onSuccess: () => {
        toast.success("Project deleted successfully!");
      },
    });
  };


  if (isLoading) return <Loading page={"projects"} />;
  if (isError) return <Error error={error} page={"projects"}/>;

  return (
    <>
      <TopBar
        title="Projects"
        definition="Create and manage your projects here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Project
          </button>
        }
        search={
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primaryDark"
          />
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<Project>
            data={filteredProjects || []}
            columns={columns}
            actions={{
              edit: (row) => {
                setInitialDataForUpdate(row);
                setIsUpdateModalOpen(true);
              },
              delete: (row) => handleDeleteProject(row._id),
            }}
          />
        </div>
      </main>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProject}
        isLoading={addProjectStatus === "pending"}
      />

      {/* Update Project Modal */}
      <UpdateProjectModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateProject}
        isLoading={updateProjectStatus === "pending"}
        initialData={initialDataForUpdate}
      />
    </>
  );
};

export default ProjectsPage;
