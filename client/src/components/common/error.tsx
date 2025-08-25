import type { AxiosError } from "axios";
// Types
import type { ErrorResponse } from "../../types/contacts.types";

const Error = ({ error }: { error: AxiosError<ErrorResponse> }) => {
  return (
    <div className="flex justify-center my-6">
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded w-full max-w-md text-center shadow-sm">
        <p className="font-semibold text-lg">Error loading contacts</p>
        <p className="text-sm mt-1">
          {error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"}
        </p>
      </div>
    </div>
  );
};

export default Error;
