import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { CreateMaterialProfile } from "../../types/material-profile.types";

type AddMaterialProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMaterialProfile, resetFields: () => void) => void;
  isLoading: boolean;
};

const AddMaterialProfileModal = ({isOpen, onClose, onSubmit, isLoading}: AddMaterialProfileModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateMaterialProfile>();

  if (!isOpen) return null;

const isFile = (value: unknown): value is File => value instanceof File;

const onSubmitForm = (data: CreateMaterialProfile) => {
  const file = data.manufacturerInformation;

  // Validate PDF file
  if (file && isFile(file) && file.type !== "application/pdf") {
    toast.error("Only PDF files are allowed");
    return;
  }

  const filteredData: CreateMaterialProfile = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "" && value != null)
  ) as CreateMaterialProfile;

  const dataToSend: CreateMaterialProfile & { file?: File } = {
    ...filteredData,
  };
  if (isFile(file)) {
    dataToSend.file = file;
    delete dataToSend.manufacturerInformation;
  }

  onSubmit(dataToSend, reset);
};

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

        <h2 className="text-xl font-semibold mb-4">Add Material Profile</h2>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {[
            "improvementType",
            "type",
            "manufacturer",
            "model",
            "modelQualifier",
            "pcdfId",
            "subType",
            "combinationBoiler",
          ].map((field) => (
            <div key={field}>
              <input
                {...register(field as keyof CreateMaterialProfile)}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (optional)`}
                className="border p-2 w-full"
              />
              {errors[field as keyof CreateMaterialProfile] && (
                <p className="text-red-500">
                  {errors[field as keyof CreateMaterialProfile]?.message}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1">
              Manufacturer Information PDF (optional)
            </label>
            <Controller
              control={control}
              name="manufacturerInformation"
              render={({ field }) => (
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0] || null);
                  }}
                />
              )}
            />
            {errors.manufacturerInformation && (
              <p className="text-red-500">{errors.manufacturerInformation.message}</p>
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
              {isLoading ? "Adding..." : "Add Material Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterialProfileModal;
