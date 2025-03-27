"use client";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    if (!searchQuery) return;

    if (typeof window !== "undefined") {
      setIsSearching(true);
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("input_query", searchQuery);
      router.push(`/?${currentParams.toString()}`);

      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };


  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto my-8 ">
        <div className="flex items-center gap-6">
          <div className="w-[150px] h-[100px]"></div>
          <div className="w-full flex gap-2">
            <div className="flex md:min-w-2xl relative h-[56px]"></div>
            <div className="w-[80px] h-[40px]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-4 fixed top-0 z-40 pl-10  bg-white shadow-sm">
      <div className="flex items-center gap-6">
        <div>
          <Image
            src="/assets/images/traidmarkia_logo.png"
            alt="trademarkia"
            height={100}
            width={150}
          />
        </div>
        <div className="w-full flex gap-2">
          <div className="flex md:min-w-2xl relative">
            <Search
              size={16}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              value={searchQuery}
              type="text"
              placeholder="Search Trademark Here eg. Mickey Mouse"
              className="flex-1 p-2 py-4 border border-[#D4D4D4] rounded-lg text-[#636363] text-sm outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
          </div>
          <button
            className={`text-white text-sm px-6 py-2 rounded-lg flex items-center justify-center min-w-[100px] ${
              isSearching ? "bg-blue-400" : "bg-[#4380EC] hover:bg-blue-600"
            }`}
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
