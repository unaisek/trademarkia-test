export function getFilterFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
) {
  const filters: Record<string, string[] | string> = {};

  if (searchParams.status) {
    filters.status = Array.isArray(searchParams.status)
      ? searchParams.status
      : searchParams.status.split(",");
  }


  if (searchParams.owners) {
    filters.owners = Array.isArray(searchParams.owners)
      ? searchParams.owners
      : searchParams.owners.split(",");
  }

  if (searchParams.attorneys) {
    filters.attorneys = Array.isArray(searchParams.attorneys)
      ? searchParams.attorneys
      : searchParams.attorneys.split(",");
  }

  if(searchParams.law_firms){
     filters.law_firms = Array.isArray(searchParams.law_firms)
       ? searchParams.law_firms
       : searchParams.law_firms.split(",");
  }

  if (searchParams.input_query) {
    filters.input_query = searchParams.input_query
  }
  console.log(filters, "filters");
  return filters;
}
