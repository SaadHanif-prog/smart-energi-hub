import { toast } from "react-hot-toast";
import { useState } from "react";
// Components
import Table from "../components/common/table";
import TopBar from "../components/common/topbar";
import Loading from "../components/common/loading";
import Error from "../components/common/error";
import FloorPlanEditor from "../components/properties/floor-plan-editor";
// Modals
import AddPropertyModal from "../modals/properties/add.property-model";
import UpdatePropertyModal from "../modals/properties/update-property-modal";
// Hooks
import {useProperties, useAddProperty, useUpdateProperty, useDeleteProperty} from "../hooks/properties.hook";
// Types
import type { Property, CreateProperty, UpdateProperty} from "../types/properties.types";
import type { Column } from "../components/common/table";

const Properties = () => {
  const { data: properties, isLoading, isError, error } = useProperties();
  const { mutate: addProperty, status: addPropertyStatus } = useAddProperty();
  const { mutate: updateProperty, status: updatePropertyStatus } = useUpdateProperty();
  const { mutate: deleteProperty } = useDeleteProperty();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [propertyIdForDesign, setPropertyIdForDesign] = useState("")
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isFloorPlanEditorOpen, setIsFloorPlanEditorOpen] = useState(false);
  const [floorPlanImageUrL, setFloorPlanImageUrl] = useState<string>("");
  const [initialDataForUpdate, setInitialDataForUpdate] = useState<UpdateProperty | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties =
    properties?.filter(
      (property) =>
        property.addressLine1?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.postcode.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleAddProperty = (data: CreateProperty, resetFields: () => void) => {
    addProperty(data, {
      onSuccess: () => {
        toast.success("Property added successfully!");
        resetFields();
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdateProperty = (data: UpdateProperty) => {
    updateProperty(data, {
      onSuccess: () => {
        toast.success("Property updated successfully!");
        setIsUpdateModalOpen(false);
      },
    });
  };

  const handleDeleteProperty = (_id: string) => {
    deleteProperty(_id, {
      onSuccess: () => {
        toast.success("Property deleted successfully!");
      },
    });
  };

  const handleFloorPlanEditor = (imageUrl: string, propertyId: string) => {
    setPropertyIdForDesign(propertyId);
    setFloorPlanImageUrl(imageUrl);
    setIsFloorPlanEditorOpen(true);
  };

  // Columns definition
  const columns: Column<Property>[] = [
      {
      key: "propertyImage",
      title: "Sitemap",
      render: (row) => (
         <button className="cursor-pointer"
          onClick={() => {
            handleFloorPlanEditor(row.propertyImage as string, row._id)
          }}
        >View</button>
      ),
    },
    { key: "addressLine1", title: "Address Line 1" },
    { key: "addressLine2", title: "Address Line 2" },
    { key: "addressLine3", title: "Address Line 3" },
    { key: "buildingName", title: "Building Name" },
    { key: "buildingNumber", title: "Building Number" },
    { key: "organisationName", title: "Organisation Name" },
    { key: "departmentName", title: "Department Name" },
    { key: "subBuilding", title: "Sub Building" },
    { key: "premise", title: "Premise" },
    { key: "town", title: "Town" },
    { key: "district", title: "District" },
    { key: "county", title: "County" },
    { key: "traditionalCounty", title: "Traditional County" },
    { key: "administrativeArea", title: "Administrative Area" },
    { key: "ward", title: "Ward" },
    { key: "postcode", title: "Postcode" },
    { key: "postcodeInwards", title: "Postcode Inwards" },
    { key: "postcodeOutwards", title: "Postcode Outwards" },
    { key: "postcodeType", title: "Postcode Type" },
    { key: "deliveryPointSuffix", title: "Delivery Point Suffix" },
    { key: "dependantLocality", title: "Dependant Locality" },
    { key: "doubleDependantLocality", title: "Double Dependant Locality" },
    { key: "dependantThoroughfare", title: "Dependant Thoroughfare" },
    { key: "thoroughfare", title: "Thoroughfare" },
    { key: "poBox", title: "PO Box" },
    { key: "udprn", title: "UDPRN" },
    { key: "umprn", title: "UMPRN" },
    { key: "isRural", title: "Is Rural" },
    { key: "latitude", title: "Latitude" },
    { key: "longitude", title: "Longitude" },
    { key: "eastings", title: "Eastings" },
    { key: "northings", title: "Northings" },
    { key: "suOrganisationIndicator", title: "SU Organisation Indicator" },
  ];

  if (isLoading) return <Loading page={"properties"} />;

  if (isError) return <Error error={error} page={"properties"} />;

  return (
    <>
      <TopBar
        title="Properties"
        definition="Create and manage your properties here"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primaryDark border-primaryDark text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Property
          </button>
        }
        search={
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primaryDark"
          />
        }
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<Property>
            data={filteredProperties || []}
            columns={columns}
            actions={{
              edit: (row) => {
                setInitialDataForUpdate(row);
                setIsUpdateModalOpen(true);
              },
              delete: (row) => {
                handleDeleteProperty(row._id);
              },
            }}
          />
        </div>
      </main>

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProperty}
        isLoading={addPropertyStatus === "pending"}
      />

      {/* Update Property Modal */}
      <UpdatePropertyModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateProperty}
        isLoading={updatePropertyStatus === "pending"}
        initialData={initialDataForUpdate}
      />

      {/* Property Image Editor Modal */}
       {isFloorPlanEditorOpen && (
        <FloorPlanEditor
          imageUrl={floorPlanImageUrL}
          setIsFloorPlanEditorOpen={setIsFloorPlanEditorOpen}
          propertyIdForDesign={propertyIdForDesign}
        />
      )}
    </>
  );
};

export default Properties;
