import { useForm } from "react-hook-form";
// Types
import type { CreateProperty, AddPropertyModalProps, AddPropertyFieldType } from "../../types/properties.types";

// Constants -> Form Fields
import { propertyModalFormFields } from "../../constants/property";

  const AddPropertyModal = ({isOpen, onClose, onSubmit, isLoading}: AddPropertyModalProps) => {
    
    const {register, handleSubmit, formState: { errors }, reset} = useForm<CreateProperty>();

    const formFields: AddPropertyFieldType[] = propertyModalFormFields as AddPropertyFieldType[];

    const onSubmitForm = (data: CreateProperty) => {
      const filteredObj = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== "" && value !== null
        )
      ) as CreateProperty;

      onSubmit(filteredObj, reset);
    };

    if (!isOpen) return null;

  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
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

          <h2 className="text-xl font-semibold mb-4">Add Property</h2>

          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="space-y-3 max-h-[80vh] overflow-y-auto"
          >
            {formFields.map((field) => (
              <div key={field.name}>
                {field.type === "checkbox" ? (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...register(field.name)} />
                    {field.label}
                  </label>
                ) : (
                  <>
                    <input
                      type={field.type}
                      {...register(
                        field.name,
                        field.required ? { required: field.required } : {}
                      )}
                      placeholder={field.placeholder}
                      className="border p-2 w-full"
                    />
                    {errors[field.name] && (
                      <p className="text-red-500">
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}

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
                {isLoading ? "Adding..." : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default AddPropertyModal;
