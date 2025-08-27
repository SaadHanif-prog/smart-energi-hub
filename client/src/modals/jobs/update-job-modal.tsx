import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Types
import type { UpdateJob } from "../../types/jobs.types";
import type { Lead } from "../../types/leads.types";

type UpdateJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateJob) => void;
  isLoading: boolean;
  initialData?: UpdateJob;
  leads: Lead[] | undefined;
};

const UpdateJobModal = ({isOpen, onClose, onSubmit, isLoading, initialData, leads,
}: UpdateJobModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateJob>({
    defaultValues: initialData || {},
  });

  // Reset form whenever initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        lead: initialData.lead || "",
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: UpdateJob) => {
    const filteredObj = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "" && value !== null)
    ) as UpdateJob;

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

        <h2 className="text-xl font-semibold mb-4">Update Job</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Lead Dropdown */}
          <div>
            <select
              {...register("lead")}
              className="border p-2 w-full"
              defaultValue={initialData?.lead || ""}
            >
              <option value="">Select a lead</option>
              {leads?.map((l) => (
                <option key={l._id} value={l._id}>
                  {l.reference || l.industry}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <input
              {...register("jobType", { required: "Job type is required" })}
              placeholder="Job Type"
              className="border p-2 w-full"
              defaultValue={initialData?.jobType || ""}
            />
            {errors.jobType && (
              <p className="text-red-500">{errors.jobType.message}</p>
            )}
          </div>

          {/* Job Subtype */}
          <div>
            <input
              {...register("jobSubType", { required: "Job subtype is required" })}
              placeholder="Job Subtype"
              className="border p-2 w-full"
              defaultValue={initialData?.jobSubType || ""}
            />
            {errors.jobSubType && (
              <p className="text-red-500">{errors.jobSubType.message}</p>
            )}
          </div>

          {/* Actions */}
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
              {isLoading ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobModal;
