import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Types
import type { UpdateContact } from "../../types/contacts.types";

type UpdateContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateContact, resetFields: () => void) => void;
  isLoading: boolean;
  initialData?: UpdateContact; 
};

const UpdateContactModal = ({ isOpen, onClose, onSubmit, isLoading, initialData}: UpdateContactModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateContact>({
    defaultValues: initialData || {}, 
  });

  // Reset form whenever initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset])

  const onSubmitForm = (data: UpdateContact) => {
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

        <h2 className="text-xl font-semibold mb-4">Update Contact</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <input
              {...register("reference")}
              placeholder="Reference (optional)"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <select {...register("title")} className="border p-2 w-full">
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Miss">Miss</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>

          <div>
            <input
              {...register("firstname", { required: "Firstname is required" })}
              placeholder="Firstname"
              className="border p-2 w-full"
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("surname", { required: "Surname is required" })}
              placeholder="Surname"
              className="border p-2 w-full"
            />
            {errors.surname && (
              <p className="text-red-500">{errors.surname.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("contact", { required: "Contact is required" })}
              placeholder="Contact"
              className="border p-2 w-full"
            />
            {errors.contact && (
              <p className="text-red-500">{errors.contact.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email", {
                pattern: { value: /^\S+@\S+\.\S+$/i, message: "Invalid email" },
              })}
              placeholder="Email (optional)"
              className="border p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
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
              {isLoading ? "Updating..." : "Update Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateContactModal;
