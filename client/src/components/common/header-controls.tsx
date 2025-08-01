// Icons
import { Columns3, Filter, BarChart3, Download, Search } from "lucide-react";
type HeaderControlProps = {
  createBtnText: string;
};

const HeaderControls = ({ createBtnText }: HeaderControlProps) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/30">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-primaryDark font-medium text-sm tracking-wide">
            <Columns3 className="w-4 h-4" />
            COLUMNS
          </button>
          <button className="flex items-center gap-2 text-primaryDark  font-medium text-sm tracking-wide">
            <Filter className="w-4 h-4" />
            FILTERS
          </button>
          <button className="flex items-center gap-2 text-primaryDark font-medium text-sm tracking-wide">
            <BarChart3 className="w-4 h-4" />
            DENSITY
          </button>
          <button className="flex items-center gap-2 text-primaryDark font-medium text-sm tracking-wide">
            <Download className="w-4 h-4" />
            EXPORTS
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textLight w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-textLight rounded-md bg-white text-textLight focus:outline-none focus:ring-1 focus:border-transparent"
            />
          </div>
          <button className="bg-primary text-primaryDark px-6 py-2 rounded-md transition-colors">
            {createBtnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderControls;
