'use client'
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header(){

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery) return 
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("input_query", searchQuery);
    router.push(`/?${currentParams.toString()}`)
  }
  return (
    <div className="w-full max-w-6xl mx-auto my-8">
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
              size={14}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              value={searchQuery}
              type="text"
              placeholder="Search Trademark Here eg. Mickey Mouse"
              className="flex-1 p-2 border border-[#D4D4D4] rounded-lg text-[#636363] text-sm  outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-[#4380EC] text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}