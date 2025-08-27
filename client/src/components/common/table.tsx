import { ChevronDown } from "lucide-react";

export type Column<T> = {
  key: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
};

type TableActions<T> = {
  edit?: (row: T) => void;
  view?: (row: T) => void;
  delete?: (row: T) => void;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: TableActions<T>;
};

const Table = <T extends object>({ data, columns, actions }: TableProps<T>) => {
  if (!data || data.length === 0) return <p className="p-4">No data found.</p>;

  return (
    <div className="overflow-y-auto rounded-sm">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
            {/* <th className="px-4 py-3"></th> */}
            <th className="px-4 py-3">Action</th>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 capitalize min-w-[200px]"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-100 hover:bg-gray-50/30"
            >
              {/* Checkbox */}
              {/* <td className="px-4 py-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
              />
            </td> */}

              {/* Action Dropdown */}
              <td className="px-4 py-3">
                {actions ? (
                  <select
                    className="text-sm"
                    defaultValue=""
                    onChange={(e) => {
                      const action = e.target.value;
                      if (action === "edit" && actions.edit) actions.edit(row);
                      if (action === "view" && actions.view) actions.view(row);
                      if (action === "delete" && actions.delete)
                        actions.delete(row);
                      e.target.value = "";
                    }}
                  >
                    <option value="" disabled>
                      Action
                    </option>
                    {actions.view && <option value="view">View</option>}
                    {actions.edit && <option value="edit">Edit</option>}
                    {actions.delete && <option value="delete">Delete</option>}
                  </select>
                ) : (
                  <button className="flex items-center gap-1 text-textLight hover:text-gray-800 text-sm">
                    Action
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </td>

              {/* Dynamic columns */}
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                  {col.render
                    ? col.render(row) ?? "-"
                    : String(row[col.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
