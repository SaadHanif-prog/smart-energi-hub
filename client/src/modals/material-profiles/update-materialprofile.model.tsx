import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { UpdateMaterialProfile } from "../../types/material-profile.types";

type UpdateMaterialProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateMaterialProfile & { file?: File }) => void;
  isLoading: boolean;
  initialData?: UpdateMaterialProfile;
};

const UpdateMaterialProfileModal = ({isOpen, onClose, onSubmit, isLoading, initialData}: UpdateMaterialProfileModalProps) => {
  const {register, handleSubmit, control, formState: { errors }, reset,
  } = useForm<UpdateMaterialProfile>({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);
  const isFile = (value: unknown): value is File => value instanceof File;

  const onSubmitForm = (data: UpdateMaterialProfile) => {
    const file = data.manufacturerInformation;

    if (isFile(file) && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    const filteredData: UpdateMaterialProfile = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "" && value != null)
    ) as UpdateMaterialProfile;

    const dataToSend: UpdateMaterialProfile & { file?: File } = {
      ...filteredData,
    };
    if (isFile(file)) {
      dataToSend.file = file;
      delete dataToSend.manufacturerInformation;
    }

    onSubmit(dataToSend);
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

        <h2 className="text-xl font-semibold mb-4">Update Material Profile</h2>

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
                {...register(field as keyof UpdateMaterialProfile)}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (optional)`}
                className="border p-2 w-full"
              />
              {errors[field as keyof UpdateMaterialProfile] && (
                <p className="text-red-500">
                  {errors[field as keyof UpdateMaterialProfile]?.message}
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
                  className="border p-2 w-full"
                />
              )}
            />
            {initialData?.manufacturerInformation &&
              typeof initialData.manufacturerInformation === "string" && (
                <p className="text-gray-500 mt-1 text-sm">
                  Current file:{" "}
                  <a
                    href={initialData.manufacturerInformation}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-600"
                  >
                    View PDF
                  </a>
                </p>
              )}
            {errors.manufacturerInformation && (
              <p className="text-red-500">{errors.manufacturerInformation.message}</p>
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
              {isLoading ? "Updating..." : "Update Material Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMaterialProfileModal;
