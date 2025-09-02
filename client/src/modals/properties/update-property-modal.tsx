import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { UpdateProperty, UpdatePropertyFieldType, UpdatePropertyModalProps } from "../../types/properties.types";
import { propertyModalFormFields } from "../../constants/property";

const UpdatePropertyModal = ({isOpen, onClose, onSubmit, isLoading, initialData}: UpdatePropertyModalProps) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<UpdateProperty>({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const isFile = (value: unknown): value is File => value instanceof File;

  const onSubmitForm = (data: UpdateProperty) => {
    const file = data.propertyImage;

    // Validate image type
    if (file && isFile(file) && !["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      toast.error("Only PNG, JPG, or JPEG files are allowed");
      return;
    }

    const filteredData: UpdateProperty = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "" && value != null)
    ) as UpdateProperty;

    const dataToSend: UpdateProperty & { file?: File } = { ...filteredData };

    if (isFile(file)) {
      dataToSend.file = file;
      delete dataToSend.propertyImage;
    }

    onSubmit(dataToSend);
  };

  if (!isOpen) return null;

  const formFields: UpdatePropertyFieldType[] = propertyModalFormFields as UpdatePropertyFieldType[];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={() => { onClose(); reset(initialData); }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Update Property</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-3 max-h-[80vh] overflow-y-auto">
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
                    {...register(field.name, field.required ? { required: field.required } : {})}
                    placeholder={field.placeholder}
                    className="border p-2 w-full"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500">{errors[field.name]?.message}</p>
                  )}
                </>
              )}
            </div>
          ))}

          {/* File input */}
          <div>
            <label className="block mb-1">Property Image (optional)</label>
            <Controller
              control={control}
              name="propertyImage"
              render={({ field }) => (
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    field.onChange(selectedFile);
                  }}
                  className="border p-2 w-full"
                />
              )}
            />
            {initialData?.propertyImage && typeof initialData.propertyImage === "string" && (
              <p className="text-gray-500 mt-1 text-sm">
                Current image:{" "}
                <a
                  href={initialData.propertyImage}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-600"
                >
                  View Image
                </a>
              </p>
            )}
            {errors.propertyImage && (
              <p className="text-red-500">{errors.propertyImage.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => { onClose(); reset(initialData); }}
              className="px-4 py-2 border rounded text-gray-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyModal;
