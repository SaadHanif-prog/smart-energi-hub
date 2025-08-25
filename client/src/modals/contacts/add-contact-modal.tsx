import { useForm } from "react-hook-form";
// Types
import type { CreateContact } from "../../types/contacts.types";

type AddContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateContact, resetFields: () => void) => void;
  isLoading: boolean;
};

const AddContactModal = ({isOpen, onClose, onSubmit, isLoading}: AddContactModalProps) => {

  const {register, handleSubmit, formState: { errors }, reset} = useForm<CreateContact>();

  const onSubmitForm = (data: CreateContact) => {
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
            reset();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Contact</h2>

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
              {isLoading ? "Adding..." : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;
