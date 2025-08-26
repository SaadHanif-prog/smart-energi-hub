import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Types
import type { UpdateLead } from "../../types/leads.types";

type UpdateLeadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateLead, resetFields: () => void) => void;
  isLoading: boolean;
  initialData?: UpdateLead;
};

const UpdateLeadModal = ({ isOpen, onClose, onSubmit, isLoading, initialData }: UpdateLeadModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateLead>({
    defaultValues: initialData || {},
  });

  // Reset form whenever initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: UpdateLead) => {
    onSubmit(data, reset);
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

        <h2 className="text-xl font-semibold mb-4">Update Lead</h2>

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
              {...register("industry", { required: "Industry is required" })}
              placeholder="Industry"
              className="border p-2 w-full"
            />
            {errors.industry && (
              <p className="text-red-500">{errors.industry.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("source", { required: "Source is required" })}
              placeholder="Source"
              className="border p-2 w-full"
            />
            {errors.source && (
              <p className="text-red-500">{errors.source.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("property")}
              placeholder="Property ID (optional)"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <input
              {...register("contact")}
              placeholder="Contact ID (optional)"
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
              {isLoading ? "Updating..." : "Update Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateLeadModal;
