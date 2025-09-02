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
  const {register, handleSubmit, control, formState: { errors }, reset} = useForm<UpdateMaterialProfile>({
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

        <h2 className="text-xl font-semibold mb-4">
          Update Material Profile
        </h2>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Separate fields instead of map */}
          <div>
            <input
              {...register("improvementType")}
              placeholder="Improvement Type (optional)"
              className="border p-2 w-full"
            />
            {errors.improvementType && (
              <p className="text-red-500">{errors.improvementType.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("type")}
              placeholder="Type (optional)"
              className="border p-2 w-full"
            />
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("manufacturer")}
              placeholder="Manufacturer (optional)"
              className="border p-2 w-full"
            />
            {errors.manufacturer && (
              <p className="text-red-500">{errors.manufacturer.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("model")}
              placeholder="Model (optional)"
              className="border p-2 w-full"
            />
            {errors.model && (
              <p className="text-red-500">{errors.model.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("modelQualifier")}
              placeholder="Model Qualifier (optional)"
              className="border p-2 w-full"
            />
            {errors.modelQualifier && (
              <p className="text-red-500">{errors.modelQualifier.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("pcdfId")}
              placeholder="PCDF ID (optional)"
              className="border p-2 w-full"
            />
            {errors.pcdfId && (
              <p className="text-red-500">{errors.pcdfId.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("subType")}
              placeholder="Sub Type (optional)"
              className="border p-2 w-full"
            />
            {errors.subType && (
              <p className="text-red-500">{errors.subType.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("combinationBoiler")}
              placeholder="Combination Boiler (optional)"
              className="border p-2 w-full"
            />
            {errors.combinationBoiler && (
              <p className="text-red-500">
                {errors.combinationBoiler.message}
              </p>
            )}
          </div>

          {/* File Upload */}
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
              <p className="text-red-500">
                {errors.manufacturerInformation.message}
              </p>
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
