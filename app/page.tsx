import { getAllTradeMarkData } from "@/lib/actions/trademark.actions";
import Filter from "../components/Filter";
import Header from "../components/Header";
import TradeMarkList from "../components/TradeMarkList";
import { getFilterFromSearchParams } from "@/lib/utils";

export default async function Home({ searchParams }:any) {
  const params = await searchParams;
  let trademarkData = null;


  try {
    const filters = await getFilterFromSearchParams(params);
    trademarkData = await getAllTradeMarkData(filters);

    if (!trademarkData || !trademarkData.hits) {
      throw new Error("Invalid data format received from the API");
    }
  } catch (err) {
    console.error("Error fetching trademark data:", err);

  }

  return (
    <>
      <Header />
      <div className="pt-20 mx-5 border-b-2 border-[#E7E6E6]">
        <p className="py-6 font-semibold text-[#4B5563]">
          About 159 Trademarks found
        </p>
      </div>
      <div className="flex">
        <div className="w-3/4 p-4">
          <TradeMarkList trademarkData={trademarkData?.hits?.hits || []} />
        </div>
        <div className="w-1/4 p-4">
          <Filter trademarkData={trademarkData?.aggregations || []} />
        </div>
      </div>
    </>
  );
}
