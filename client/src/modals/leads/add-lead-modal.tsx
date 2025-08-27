import { useForm } from "react-hook-form";
// Types
import type { CreateLead } from "../../types/leads.types";
import type { Property } from "../../types/properties.types";
import type { Contact } from "../../types/contacts.types";

type AddLeadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLead, resetFields: () => void) => void;
  isLoading: boolean;
  contacts: Contact[] | undefined;
  properties: Property[] | undefined;
};

const AddLeadModal = ({isOpen, onClose, onSubmit, isLoading, contacts, properties,
}: AddLeadModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLead>();

  const onSubmitForm = (data: CreateLead) => {
    const filteredObj = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null
      )
    ) as CreateLead;

    onSubmit(filteredObj, reset);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={() => {
            onClose();
            reset();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Lead</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Reference */}
          <div>
            <input
              {...register("reference")}
              placeholder="Reference (optional)"
              className="border p-2 w-full"
            />
          </div>

          {/* Industry */}
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

          {/* Source */}
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

          {/* Property Dropdown */}
          <div>
            <select
              {...register("property")}
              className="border p-2 w-full"
              defaultValue=""
            >
              <option value="">Select a property</option>
              {properties?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.addressLine1}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Dropdown */}
          <div>
            <select
              {...register("contact")}
              className="border p-2 w-full"
              defaultValue=""
            >
              <option value="">Select a contact</option>
              {contacts?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.firstname}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
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
              {isLoading ? "Adding..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
