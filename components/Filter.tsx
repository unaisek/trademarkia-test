"use client";

import { Funnel, RotateCcw, Search, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Filter({ trademarkData }) {
  
  const { attorneys, current_owners, law_firms } = trademarkData;
  const searchParams = new URLSearchParams(window.location.search)
 
  const router = useRouter();

  
  const [selectedOwners, setSelectedOwners] = useState<string[]>(
    searchParams.getAll("owners")
  );

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    searchParams.getAll("status")
  );

  const [selectedAttorneys, setSelectedAttorneys] = useState<string[]>(
    searchParams.getAll("attorneys")
  );
  const [selectedLawFirms, setSelectedLawFirms] = useState<string[]>(
    searchParams.getAll("law_firms")
  );

  
  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
    ? prev.filter((s) => s !== status)
    : [...prev, status]
  );
  
};

  const toggleOwner = (owner: string) => {
    setSelectedOwners((prev) =>
      prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner]
    );
  };


  const toggleAttorney = (attorney: string) => {
    setSelectedAttorneys((prev) =>
      prev.includes(attorney)
        ? prev.filter((a) => a !== attorney)
        : [...prev, attorney]
    );

  };
   const toggleLawFirms = (lawFirm: string) => {
    setSelectedLawFirms((prev) =>
      prev.includes(lawFirm)
        ? prev.filter((l) => l !== lawFirm)
        : [...prev, lawFirm]
    );

  };

 const clearAllFilters = (): void => {
        setSelectedStatuses([]);
        setSelectedOwners([]);
        setSelectedAttorneys([]);
        setSelectedLawFirms([]);
        router.push('/',{scroll:false})
      };

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);


    if (selectedOwners.length > 0) {
      currentParams.set("owners",selectedOwners.join(','))
    } else {
       currentParams.delete("owners");
    }

    if (selectedStatuses.length > 0) {
      currentParams.set("status", selectedStatuses.join(","));
    } else {
      currentParams.delete("status")
    }

    if (selectedAttorneys.length > 0) {
      currentParams.set("attorneys", selectedAttorneys.join(","));
    } else {
      currentParams.delete("attorneys");
    }
    if(selectedLawFirms.length > 0){
      currentParams.set("law_firms", selectedLawFirms.join(','))
    } else {
      currentParams.delete("law_firms")
    }

    router.push(`/?${currentParams.toString()}`, { scroll: false });

  }, [selectedOwners, selectedStatuses, router,selectedAttorneys,selectedLawFirms]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex items-center ml-2 p-2 border border-[#C8C8C8] rounded-md">
          <Funnel size={15} strokeWidth={2} color="#575757" />
          <p className="text-normal pl-2 text-gray-500">Filters</p>
        </div>
        <div className="rounded-full h-8 w-8 border border-[#C8C8C8] ml-2 flex items-center justify-center">
          <Share2 size={14} strokeWidth={2} color="#575757" />
        </div>
        <div
          className="rounded-full h-8 w-8 border border-[#C8C8C8] ml-2 flex items-center justify-center"
          onClick={clearAllFilters}
        >
          <RotateCcw size={14} strokeWidth={2} color="#575757" />
        </div>
      </div>
      <div className="mb-4 pt-3">
        <div className="bg-white rounded-md shadow-sm mb-2">
          <div className="p-3">
            <h3 className="font-bold">Status</h3>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap gap-2">
              {["all", "registered", "pending", "abandoned", "others"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`rounded-md px-3 py-1 text-sm border flex items-center ${
                      selectedStatuses.includes(status)
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {status !== "all" && (
                      <span
                        className={`w-2 h-2 rounded-full mr-1 ${
                          status === "registered"
                            ? "bg-green-600"
                            : status === "pending"
                            ? "bg-yellow-600"
                            : status === "abandoned"
                            ? "bg-red-600"
                            : "bg-blue-600"
                        }`}
                      ></span>
                    )}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm mb-2">
          <div className="p-2">
            <h3 className="font-bold flex items-center justify-between">
              Owners
            </h3>
          </div>
          <div className="p-2">
            {current_owners.buckets.map((owner, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`owner-${index}`}
                  checked={selectedOwners.includes(owner.key)}
                  onChange={() => toggleOwner(owner.key)}
                  className="mr-2"
                />
                <label htmlFor={`owner-${index}`} className="text-sm">
                  {owner.key}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm">
          <div className="p-3">
            <h3 className="font-bold flex items-center justify-between">
              Attorney
            </h3>
          </div>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search Owners"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
              <Search
                size={14}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            {attorneys.buckets.map((attorney, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  id={`attorney-${index}`}
                  checked={selectedAttorneys.includes(attorney.key)}
                  onChange={() => toggleAttorney(attorney.key)}
                  className="mr-2"
                />
                <label htmlFor="tesla" className="text-sm">
                  {attorney.key}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-3">
            <h3 className="font-bold flex items-center justify-between">
              Law Firms
            </h3>
          </div>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search Owners"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
              <Search
                size={14}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            {law_firms.buckets.map((lawFirm, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  id={`attorney-${index}`}
                  checked={selectedLawFirms.includes(lawFirm.key)}
                  onChange={() => toggleLawFirms(lawFirm.key)}
                  className="mr-2"
                />
                <label htmlFor="tesla" className="text-sm">
                  {lawFirm.key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
