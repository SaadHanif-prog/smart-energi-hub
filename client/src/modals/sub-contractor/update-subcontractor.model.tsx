import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Types
import type { UpdateSubContractor } from "../../types/sub-contractor.types";

type UpdateSubContractorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateSubContractor) => void;
  isLoading: boolean;
  initialData?: UpdateSubContractor;
};

const UpdateSubContractorModal = ({ isOpen, onClose, onSubmit, isLoading, initialData }: UpdateSubContractorModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateSubContractor>({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: UpdateSubContractor) => {
     const cleanedData = { ...data };
     ["eastings", "latitude", "longitude", "northings"].forEach((key) => {
       if (cleanedData[key as keyof UpdateSubContractor] === null || isNaN(cleanedData[key as keyof UpdateSubContractor] as any)) {
         delete cleanedData[key as keyof UpdateSubContractor];
       }
     });
     
     const filteredObj = Object.fromEntries(
       Object.entries(cleanedData).filter(([_, value]) => value !== "")
     ) as UpdateSubContractor;
   
     onSubmit(filteredObj);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
        <button
          onClick={() => { onClose(); reset(initialData); }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Update Sub Contractor</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Required Fields */}
          <input {...register("name", { required: "Name is required" })} placeholder="Name" className="border p-2 w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input {...register("registrationNumber", { required: "Registration Number is required" })} placeholder="Registration Number" className="border p-2 w-full" />
          {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}

          <input {...register("addressLine1", { required: "Address Line 1 is required" })} placeholder="Address Line 1" className="border p-2 w-full" />
          {errors.addressLine1 && <p className="text-red-500">{errors.addressLine1.message}</p>}

          <input {...register("postcode", { required: "Postcode is required" })} placeholder="Postcode" className="border p-2 w-full" />
          {errors.postcode && <p className="text-red-500">{errors.postcode.message}</p>}

          {/* Optional Fields */}
          <input {...register("town")} placeholder="Town (optional)" className="border p-2 w-full" />
          <input {...register("country")} placeholder="Country (optional)" className="border p-2 w-full" />
          <input {...register("administrativeArea")} placeholder="Administrative Area (optional)" className="border p-2 w-full" />
          <input {...register("addressLine2")} placeholder="Address Line 2 (optional)" className="border p-2 w-full" />
          <input {...register("addressLine3")} placeholder="Address Line 3 (optional)" className="border p-2 w-full" />
          <input {...register("buildingName")} placeholder="Building Name (optional)" className="border p-2 w-full" />
          <input {...register("buildingNumber")} placeholder="Building Number (optional)" className="border p-2 w-full" />
          <input {...register("county")} placeholder="County (optional)" className="border p-2 w-full" />
          <input {...register("deliveryPointSuffix")} placeholder="Delivery Point Suffix (optional)" className="border p-2 w-full" />
          <input {...register("departmentName")} placeholder="Department Name (optional)" className="border p-2 w-full" />
          <input {...register("dependantLocality")} placeholder="Dependant Locality (optional)" className="border p-2 w-full" />
          <input {...register("dependantThoroughfare")} placeholder="Dependant Thoroughfare (optional)" className="border p-2 w-full" />
          <input {...register("district")} placeholder="District (optional)" className="border p-2 w-full" />
          <input {...register("doubleDependantLocality")} placeholder="Double Dependant Locality (optional)" className="border p-2 w-full" />
          <input {...register("eastings", { valueAsNumber: true })} type="number" placeholder="Eastings (optional)" className="border p-2 w-full" />
          <label className="flex items-center gap-2">
            <input {...register("isRural")} type="checkbox" />
            Is Rural (optional)
          </label>
          <input {...register("latitude", { valueAsNumber: true })} type="number" placeholder="Latitude (optional)" className="border p-2 w-full" />
          <input {...register("longitude", { valueAsNumber: true })} type="number" placeholder="Longitude (optional)" className="border p-2 w-full" />
          <input {...register("northings", { valueAsNumber: true })} type="number" placeholder="Northings (optional)" className="border p-2 w-full" />
          <input {...register("organisationName")} placeholder="Organisation Name (optional)" className="border p-2 w-full" />
          <input {...register("poBox")} placeholder="PO Box (optional)" className="border p-2 w-full" />
          <input {...register("postcodeInwards")} placeholder="Postcode Inwards (optional)" className="border p-2 w-full" />
          <input {...register("postcodeOutwards")} placeholder="Postcode Outwards (optional)" className="border p-2 w-full" />
          <input {...register("postcodeType")} placeholder="Postcode Type (optional)" className="border p-2 w-full" />
          <input {...register("premise")} placeholder="Premise (optional)" className="border p-2 w-full" />
          <input {...register("suOrganisationIndicator")} placeholder="SU Organisation Indicator (optional)" className="border p-2 w-full" />
          <input {...register("subBuilding")} placeholder="Sub Building (optional)" className="border p-2 w-full" />
          <input {...register("thoroughfare")} placeholder="Thoroughfare (optional)" className="border p-2 w-full" />
          <input {...register("traditionalCounty")} placeholder="Traditional County (optional)" className="border p-2 w-full" />
          <input {...register("udprn")} placeholder="UDPRN (optional)" className="border p-2 w-full" />
          <input {...register("umprn")} placeholder="UMPRN (optional)" className="border p-2 w-full" />
          <input {...register("ward")} placeholder="Ward (optional)" className="border p-2 w-full" />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => { onClose(); reset(initialData); }} className="px-4 py-2 border rounded text-gray-700 cursor-pointer">Cancel</button>
            <button type="submit" disabled={isLoading} className="bg-primaryDark text-white px-4 py-2 rounded cursor-pointer">
              {isLoading ? "Updating..." : "Update Sub Contractor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubContractorModal;
