
import { getAllTradeMarkData } from "@/lib/actions/trademark.actions";
import Filter from "../components/Filter";
import Header from "../components/Header";
import TradeMarkList from "../components/TradeMarkList";
import { getFilterFromSearchParams } from "@/lib/utils";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    status?: string | string[];
    owners?: string | string[];
    attorneys?: string | string[];
    law_firms?: string | string[];
    input_query?: string ;
  };
}) {
  
  const filters = getFilterFromSearchParams(searchParams);
  console.log(filters);
  
  const trademarkData = await getAllTradeMarkData(filters);
  

  return (
    <>
      <Suspense fallback={<Loader />}>
      <Header />
        <div className="flex">
          <div className="w-3/4 p-4">
            <TradeMarkList trademarkData={trademarkData?.hits?.hits|| []} />
          </div>
          <div className="w-1/4 p-4">
            <Filter trademarkData={trademarkData?.aggregations || []} />
          </div>
        </div>

      </Suspense>
    </>
  );
}
