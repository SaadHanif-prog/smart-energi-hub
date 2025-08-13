import { useState } from "react";

// Components
import TopBar from "../components/common/topbar";
import HeaderControls from "../components/common/header-controls";
import TableHeader from "../components/common/table-header";
import FloorPlanEditor from "../components/properties/floor-plan-editor";

const Properties = () => {
  const sampleData = [
    {
      reference: "PROP-82669",
      addressLine1: "51 Broughton Street",
      sitemap: "/images/floor-plan.png",
      postcode: "SW8 3QU",
      organisation: "SEH Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-82640",
      addressLine1: "1 Holden Street",
      sitemap: "/images/floor-plan.png",
      postcode: "SW11 5UW",
      organisation: "SEH Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-78560",
      addressLine1: "53 Victoria Street",
      sitemap: "/images/floor-plan.png",
      postcode: "ME12 1YB",
      organisation: "SEH Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-77791",
      addressLine1: "3 Bellhurst Cottages",
      sitemap: "/images/floor-plan.png",
      postcode: "TN32 5DN",
      organisation: "SEH Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-77770",
      addressLine1: "17 Orchard Close",
      sitemap: "/images/floor-plan.png",
      postcode: "TN34 2BZ",
      organisation: "SEH Approach Ltd",
      tags: "+",
    },
    {
      reference: "PROP-77750",
      addressLine1: "38 Firle Close",
      sitemap: "/images/floor-plan.png",
      postcode: "TN35 5ET",
      organisation: "SEH Approach Ltd",
      tags: "+",
    },
  ];

  const [isFloorPlanEditorOpen, setIsFloorPlanEditorOpen] = useState(false);
  const [floorPlanImageUrL, setFloorPlanImageUrl] = useState("");

  const handleFloorPlanEditor = (imageUrl: string) => {
    setFloorPlanImageUrl(imageUrl);
    setIsFloorPlanEditorOpen(true);
  };

  return (
    <>
      <TopBar
        title="Properties"
        definition="Create and manage your properties here"
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header Controls */}
          <HeaderControls createBtnText="Create Property" />

          {/* Table */}
          <table className="min-w-full text-sm text-left border-collapse">
            <TableHeader
              column={[
                "reference",
                "addressLine1",
                "sitemap",
                "postcode",
                "organisation",
                "tags",
              ]}
            />

            <tbody>
              {sampleData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-gray-100 hover:bg-gray-50/30 ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/10"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                    />
                  </td>

                  {/* Action button */}
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-textLight hover:text-gray-800 text-sm">
                      Action
                    </button>
                  </td>

                  {/* Reference */}
                  <td className="px-4 py-3 text-gray-700 text-sm font-mono">
                    {item.reference}
                  </td>

                  {/* Address */}
                  <td className="px-4 py-3 text-gray-700 text-sm">
                    {item.addressLine1}
                  </td>

                  {/* Sitemap */}
                  <td className="px-4 py-3 text-gray-700 text-sm">
                    <button
                      onClick={() => {
                        handleFloorPlanEditor(item.sitemap);
                      }}
                    >
                      View
                    </button>
                  </td>

                  {/* Postcode */}
                  <td className="px-4 py-3 text-gray-700 text-sm">
                    {item.postcode}
                  </td>

                  {/* Organisation */}
                  <td className="px-4 py-3 text-gray-700 text-sm">
                    {item.organisation}
                  </td>

                  {/* Tags */}
                  <td className="px-4 py-3 text-gray-700 text-sm">
                    {item.tags}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {isFloorPlanEditorOpen && (
        <FloorPlanEditor
          imageUrl={floorPlanImageUrL}
          setIsFloorPlanEditorOpen={setIsFloorPlanEditorOpen}
        />
      )}
    </>
  );
};

export default Properties;
