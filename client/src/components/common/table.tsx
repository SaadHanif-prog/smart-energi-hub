import { ChevronDown } from "lucide-react";

type TableProps = {
  data: Array<Record<string, any>>;
  visibleColumns?: string[];
};

const Table = ({ data, visibleColumns }: TableProps) => {
  if (!data || data.length === 0) return <p>No data found.</p>;

  const columns = visibleColumns || Object.keys(data[0]);

  return (
    <table className="min-w-full text-sm text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
          <th className="px-4 py-3"></th>
          <th className="px-4 py-3">Action</th>
          {columns.map((col) => (
            <th key={col} className="px-4 py-3 capitalize">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`border-b border-gray-100 hover:bg-gray-50/30 ${
              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/10"
            }`}
          >
            <td className="px-4 py-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
              />
            </td>

            <td className="px-4 py-3">
              <button className="flex items-center gap-1 text-textLight hover:text-gray-800 text-sm">
                Action
                <ChevronDown className="w-4 h-4" />
              </button>
            </td>

            {columns.map((col) => (
              <td
                key={col}
                className={`px-4 py-3 text-gray-700 text-sm ${
                  col === "reference" || col === "phone" ? "font-mono" : ""
                }`}
              >
                {row[col] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
