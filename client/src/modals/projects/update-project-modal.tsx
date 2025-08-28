import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Types
import type { UpdateProject, UpdateProjectModalProps } from "../../types/projects.types";

const UpdateProjectModal = ({ isOpen, onClose, onSubmit, isLoading, initialData }: UpdateProjectModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateProject>({
    defaultValues: initialData || {},
  });

  // Reset form whenever initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: UpdateProject) => {
    const filteredObj = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null
      )
    ) as UpdateProject;

    onSubmit(filteredObj);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={() => {
            onClose();
            reset(initialData);
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Update Project</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <input
              {...register("reference")}
              placeholder="Reference (optional)"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <input
              {...register("name", { required: "Project name is required" })}
              placeholder="Project Name"
              className="border p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("organisation")}
              placeholder="Organisation (optional)"
              className="border p-2 w-full"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset(initialData);
              }}
              className="px-4 py-2 border rounded text-gray-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectModal;
