const TableHeader = ({ column }: { column: string[] }) => {
  return (
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
        <th className="px-4 py-3"></th>
        <th className="px-4 py-3">Action</th>
        {column.map((col) => (
          <th key={col} className="px-4 py-3 capitalize">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
