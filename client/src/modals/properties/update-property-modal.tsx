import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Types
import type { UpdateProperty } from "../../types/properties.types";

type UpdatePropertyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateProperty) => void;
  isLoading: boolean;
  initialData?: UpdateProperty;
};

const UpdatePropertyModal = ({isOpen ,onClose, onSubmit, isLoading, initialData}: UpdatePropertyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProperty>({
    defaultValues: initialData,
  });

    // Reset form whenever initialData changes
    useEffect(() => {
      if (initialData) {
        reset(initialData);
      }
    }, [initialData, reset]);

  const onSubmitForm = (data: UpdateProperty) => {
    const filteredObj = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null
      )
    ) as UpdateProperty;

    onSubmit(filteredObj);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
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

        <h2 className="text-xl font-semibold mb-4">Update Property</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Required fields */}
          <div>
            <input
              {...register("addressLine1", { required: "Address Line 1 is required" })}
              placeholder="Address Line 1"
              className="border p-2 w-full"
            />
            {errors.addressLine1 && <p className="text-red-500">{errors.addressLine1.message}</p>}
          </div>

          <div>
            <input
              {...register("postcode", { required: "Postcode is required" })}
              placeholder="Postcode"
              className="border p-2 w-full"
            />
            {errors.postcode && <p className="text-red-500">{errors.postcode.message}</p>}
          </div>

          {/* Optional fields */}
          <div>
            <input {...register("town")} placeholder="Town (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("country")} placeholder="Country (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("administrativeArea")} placeholder="Administrative Area (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("addressLine2")} placeholder="Address Line 2 (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("addressLine3")} placeholder="Address Line 3 (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("buildingName")} placeholder="Building Name (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("buildingNumber")} placeholder="Building Number (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("county")} placeholder="County (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("deliveryPointSuffix")} placeholder="Delivery Point Suffix (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("departmentName")} placeholder="Department Name (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("dependantLocality")} placeholder="Dependant Locality (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("dependantThoroughfare")} placeholder="Dependant Thoroughfare (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("district")} placeholder="District (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("doubleDependantLocality")} placeholder="Double Dependant Locality (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input type="number" {...register("eastings")} placeholder="Eastings (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("isRural")} />
              Is Rural
            </label>
          </div>
          <div>
            <input type="number" {...register("latitude")} placeholder="Latitude (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input type="number" {...register("longitude")} placeholder="Longitude (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input type="number" {...register("northings")} placeholder="Northings (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("organisationName")} placeholder="Organisation Name (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("poBox")} placeholder="PO Box (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("postcodeInwards")} placeholder="Postcode Inwards (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("postcodeOutwards")} placeholder="Postcode Outwards (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("postcodeType")} placeholder="Postcode Type (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("premise")} placeholder="Premise (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("suOrganisationIndicator")} placeholder="SU Organisation Indicator (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("subBuilding")} placeholder="Sub Building (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("thoroughfare")} placeholder="Thoroughfare (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("traditionalCounty")} placeholder="Traditional County (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("udprn")} placeholder="UDPRN (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("umprn")} placeholder="UMPRN (optional)" className="border p-2 w-full" />
          </div>
          <div>
            <input {...register("ward")} placeholder="Ward (optional)" className="border p-2 w-full" />
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
              {isLoading ? "Updating..." : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyModal;
