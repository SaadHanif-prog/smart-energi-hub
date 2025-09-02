import { useForm } from "react-hook-form";
// Types 
import type { CreateSubContractor, AddSubContractorFieldType, AddSubContractorModalProps } from "../../types/sub-contractor.types";
// Constants -> Form Fields
import { subcontractorFormFields } from "../../constants/sub-contractor";

const AddSubContractorModal = ({isOpen, onClose, onSubmit, isLoading}: AddSubContractorModalProps) => {
  const {register, handleSubmit, formState: { errors }, reset} = useForm<CreateSubContractor>();

  const formFields: AddSubContractorFieldType[] = subcontractorFormFields as AddSubContractorFieldType[];

  const onSubmitForm = (data: CreateSubContractor) => {
    const cleanedData = { ...data };
    ["eastings", "latitude", "longitude", "northings"].forEach((key) => {
      if (
        cleanedData[key as keyof CreateSubContractor] === null ||
        isNaN(cleanedData[key as keyof CreateSubContractor] as any)
      ) {
        delete cleanedData[key as keyof CreateSubContractor];
      }
    });

    const filteredObj = Object.fromEntries(
      Object.entries(cleanedData).filter(([_, value]) => value !== "")
    ) as CreateSubContractor;

    onSubmit(filteredObj, reset);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
        <button
          onClick={() => {
            onClose();
            reset();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Sub Contractor</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
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
              {isLoading ? "Adding..." : "Add Sub Contractor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubContractorModal;
