"use client";

import { Funnel, RotateCcw, Search, Share2, Loader2, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterBucketItem {
  key: string;
  doc_count: number;
}

interface InitialDataRef {
  owners: FilterBucketItem[];
  attorneys: FilterBucketItem[];
  lawFirms: FilterBucketItem[];
  searchQuery: string;
}

export default function Filter({ trademarkData }: any) {
  const router = useRouter();
  const clientSearchParams = useSearchParams();
  const { attorneys, current_owners, law_firms } = trademarkData;

  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState<string[]>([]);
  const [selectedLawFirms, setSelectedLawFirms] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [ownerSearch, setOwnerSearch] = useState("");
  const [attorneySearch, setAttorneySearch] = useState("");
  const [lawFirmSearch, setLawFirmSearch] = useState("");

  const initialDataRef = useRef<InitialDataRef>({
    owners: [],
    attorneys: [],
    lawFirms: [],
    searchQuery: "",
  });

  const inputQueryParam = clientSearchParams.get("input_query") || "";

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    if (inputQueryParam !== initialDataRef.current.searchQuery) {
      initialDataRef.current = {
        owners: [],
        attorneys: [],
        lawFirms: [],
        searchQuery: inputQueryParam,
      };

      setSelectedOwners([]);
      setSelectedStatuses([]);
      setSelectedAttorneys([]);
      setSelectedLawFirms([]);
    }
  }, [inputQueryParam]);

  useEffect(() => {
    if (initialDataRef.current.owners.length === 0 && current_owners?.buckets) {
      initialDataRef.current.owners = [...current_owners.buckets];
    }

    if (initialDataRef.current.attorneys.length === 0 && attorneys?.buckets) {
      initialDataRef.current.attorneys = [...attorneys.buckets];
    }

    if (initialDataRef.current.lawFirms.length === 0 && law_firms?.buckets) {
      initialDataRef.current.lawFirms = [...law_firms.buckets];
    }
  }, [current_owners, attorneys, law_firms]);

  useEffect(() => {
    const ownersParam = clientSearchParams.get("owners");
    const statusParam = clientSearchParams.get("status");
    const attorneysParam = clientSearchParams.get("attorneys");
    const lawFirmsParam = clientSearchParams.get("law_firms");

    if (ownersParam) setSelectedOwners(ownersParam.split(","));
    if (statusParam) setSelectedStatuses(statusParam.split(","));
    if (attorneysParam) setSelectedAttorneys(attorneysParam.split(","));
    if (lawFirmsParam) setSelectedLawFirms(lawFirmsParam.split(","));
  }, [clientSearchParams]);

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
    setIsFiltering(true);
    setSelectedStatuses([]);
    setSelectedOwners([]);
    setSelectedAttorneys([]);
    setSelectedLawFirms([]);

    const params = new URLSearchParams();
    if (inputQueryParam) {
      params.set("input_query", inputQueryParam);
    }
    router.push(`/?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      setIsFiltering(false);
    }, 1000);
  };

  const clearSearch = (searchType: string) => {
    switch (searchType) {
      case "owner":
        setOwnerSearch("");
        break;
      case "attorney":
        setAttorneySearch("");
        break;
      case "lawFirm":
        setLawFirmSearch("");
        break;
    }
  };

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setIsFiltering(true);

      const params = new URLSearchParams(clientSearchParams.toString());

      if (selectedOwners.length > 0) {
        params.set("owners", selectedOwners.join(","));
      } else {
        params.delete("owners");
      }

      if (selectedStatuses.length > 0) {
        params.set("status", selectedStatuses.join(","));
      } else {
        params.delete("status");
      }

      if (selectedAttorneys.length > 0) {
        params.set("attorneys", selectedAttorneys.join(","));
      } else {
        params.delete("attorneys");
      }

      if (selectedLawFirms.length > 0) {
        params.set("law_firms", selectedLawFirms.join(","));
      } else {
        params.delete("law_firms");
      }

      const newUrl = params.toString();
      const currentUrl = clientSearchParams.toString();

      if (newUrl !== currentUrl) {
        router.push(`/?${newUrl}`, { scroll: false });

        setTimeout(() => {
          setIsFiltering(false);
        }, 1000);
      } else {
        setIsFiltering(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    selectedOwners,
    selectedStatuses,
    selectedAttorneys,
    selectedLawFirms,
    router,
    mounted,
    clientSearchParams,
  ]);

  const filteredOwners = ownerSearch
    ? initialDataRef.current.owners.filter((owner) =>
        owner.key.toLowerCase().includes(ownerSearch.toLowerCase())
      )
    : initialDataRef.current.owners;

  const filteredAttorneys = attorneySearch
    ? initialDataRef.current.attorneys.filter((attorney) =>
        attorney.key.toLowerCase().includes(attorneySearch.toLowerCase())
      )
    : initialDataRef.current.attorneys;

  const filteredLawFirms = lawFirmSearch
    ? initialDataRef.current.lawFirms.filter((lawFirm) =>
        lawFirm.key.toLowerCase().includes(lawFirmSearch.toLowerCase())
      )
    : initialDataRef.current.lawFirms;

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-8 mb-4 rounded"></div>
        <div className="bg-gray-200 h-32 mb-2 rounded"></div>
        <div className="bg-gray-200 h-32 mb-2 rounded"></div>
        <div className="bg-gray-200 h-32 mb-2 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      {isFiltering && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-xs bg-opacity-100 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <Loader2 size={24} className="animate-spin mr-3 text-blue-500" />
            <p>Updating results...</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        <div className="flex items-center ml-2 p-2 border border-[#C8C8C8] rounded-md">
          <Funnel size={15} strokeWidth={2} color="#575757" />
          <p className="text-normal pl-2 text-gray-500">Filters</p>
        </div>
        <div className="rounded-full h-8 w-8 border border-[#C8C8C8] ml-2 flex items-center justify-center">
          <Share2 size={14} strokeWidth={2} color="#575757" />
        </div>
        <div
          className={`rounded-full h-8 w-8 border border-[#C8C8C8] ml-2 flex items-center justify-center ${
            selectedOwners.length > 0 ||
            selectedStatuses.length > 0 ||
            selectedAttorneys.length > 0 ||
            selectedLawFirms.length > 0
              ? "cursor-pointer bg-gray-100 hover:bg-gray-200"
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={
            selectedOwners.length > 0 ||
            selectedStatuses.length > 0 ||
            selectedAttorneys.length > 0 ||
            selectedLawFirms.length > 0
              ? clearAllFilters
              : undefined
          }
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
                    disabled={isFiltering}
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
          <div className="p-3">
            <h3 className="font-bold flex items-center justify-between">
              Owners
            </h3>
          </div>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search Owners"
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
                disabled={isFiltering}
              />
              {ownerSearch ? (
                <X
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => clearSearch("owner")}
                />
              ) : (
                <Search
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              )}
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredOwners.map((owner: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center p-1 ${
                    selectedOwners.includes(owner.key)
                      ? "bg-blue-50 rounded"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`owner-${index}`}
                    checked={selectedOwners.includes(owner.key)}
                    onChange={() => toggleOwner(owner.key)}
                    className="mr-2"
                    disabled={isFiltering}
                  />
                  <label htmlFor={`owner-${index}`} className="text-[14px]">
                    {owner.key.charAt(0).toUpperCase() + owner.key.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            {ownerSearch && filteredOwners.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No matching owners found
              </p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-md shadow-sm mb-2">
          <div className="p-3">
            <h3 className="font-bold flex items-center justify-between">
              Attorney
            </h3>
          </div>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search Attorneys"
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
                value={attorneySearch}
                onChange={(e) => setAttorneySearch(e.target.value)}
                disabled={isFiltering}
              />
              {attorneySearch ? (
                <X
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => clearSearch("attorney")}
                />
              ) : (
                <Search
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              )}
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredAttorneys.map((attorney: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center p-1 ${
                    selectedAttorneys.includes(attorney.key)
                      ? "bg-blue-50 rounded"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`attorney-${index}`}
                    checked={selectedAttorneys.includes(attorney.key)}
                    onChange={() => toggleAttorney(attorney.key)}
                    className="mr-2"
                    disabled={isFiltering}
                  />
                  <label htmlFor={`attorney-${index}`} className="text-[14px]">
                    {attorney.key.charAt(0).toUpperCase() +
                      attorney.key.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            {attorneySearch && filteredAttorneys.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No matching attorneys found
              </p>
            )}
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
                placeholder="Search Law Firms"
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
                value={lawFirmSearch}
                onChange={(e) => setLawFirmSearch(e.target.value)}
                disabled={isFiltering}
              />
              {lawFirmSearch ? (
                <X
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => clearSearch("lawFirm")}
                />
              ) : (
                <Search
                  size={14}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              )}
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredLawFirms.map((lawFirm: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center p-1 ${
                    selectedLawFirms.includes(lawFirm.key)
                      ? "bg-blue-50 rounded"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`law-firm-${index}`}
                    checked={selectedLawFirms.includes(lawFirm.key)}
                    onChange={() => toggleLawFirms(lawFirm.key)}
                    className="mr-2"
                    disabled={isFiltering}
                  />
                  <label htmlFor={`law-firm-${index}`} className="text-[14px]">
                    {lawFirm.key.charAt(0).toUpperCase() + lawFirm.key.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            {lawFirmSearch && filteredLawFirms.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No matching law firms found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
