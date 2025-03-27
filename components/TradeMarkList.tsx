import { ChevronRight, RefreshCw,} from "lucide-react";
import Image from "next/image";

export default async function TradeMarkList({trademarkData}){
   const getStatusColor = (status:string) => {
    switch (status) {
      case 'registered':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'abandoned':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getStatusDot = (status:string) => {
    switch (status) {
      case 'registered':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'abandoned':
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  const convertToIST = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };


  return (
    <div>
      <div className="p-5"></div>
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-sm border-b border-gray-200">
            <tr>
              <th className="text-left p-3 font-semibold">Mark</th>
              <th className="text-left p-3 font-semibold">Details</th>
              <th className="text-left p-3 font-semibold">Status</th>
              <th className="text-left p-3 font-semibold">
                Class/ Description
              </th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              {trademarkData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No results found.
                  </td>
                </tr>
              ) : (
                trademarkData.map((item, index: number) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-3 min-w-[150px]">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative w-16 h-16 bg-gray-100 flex items-center justify-center rounded mb-2">
                          <Image
                            src="/assets/images/Image Unavailable.png"
                            alt={item._source.mark_identification}
                            width={64}
                            height={64}
                            className="max-w-full max-h-full"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <p className="font-bold max-w-[300px] text-[#1A1A1A]">
                        {item._source.mark_identification}
                      </p>
                      <p className="text-xs font-normal">
                        {item._source.current_owner}
                      </p>
                      <br />
                      <p className="font-bold">{item._id}</p>
                      <p className="text-xs font-normal">
                        {convertToIST(item._source.registration_date)}
                      </p>
                    </td>

                    <td className="p-3 align-top">
                      <p
                        className={`text-xs flex items-center ${getStatusColor(
                          item._source.status_type
                        )}`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${getStatusDot(
                            item._source.status_type
                          )} mr-1`}
                        ></span>
                        {item._source.status_type.charAt(0).toUpperCase() +
                          item._source.status_type.slice(1)}
                      </p>
                      <p className="pt-2 text-xs font-normal mb-5">
                        on{" "}
                        <strong>
                          {convertToIST(item._source.status_date)}
                        </strong>
                      </p>
                      <br />
                      <div className="flex items-center text-xs">
                        <RefreshCw color="#EC4A4A" size={14} strokeWidth={3} />
                        <p className="pl-2">
                          {convertToIST(item._source.renewal_date)}
                        </p>
                      </div>
                    </td>

                    <td className="p-3 align-top">
                      <p className="text-xs mb-5 max-w-[250px] line-clamp-3">
                        {item._source.mark_description_description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item._source.class_codes.map((num, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs"
                          >
                            <span className="text-bold mr-1">Class {num}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="pr-5">
                      <div className="flex items-center justify-center">
                        <ChevronRight size={16} strokeWidth={2} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </table>
      </div>
    </div>
  );
}