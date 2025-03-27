export async function getFilterFromSearchParams(searchParams: any) {
  const filters: Record<string, string[] | string> = {};

  const params = await Promise.resolve(searchParams);

  try {
 
    if (params?.status) {
      filters.status = Array.isArray(params.status)
        ? params.status
        : params.status.split(",");
    }

    if (params?.owners) {
      filters.owners = Array.isArray(params.owners)
        ? params.owners
        : params.owners.split(",");
    }

    if (params?.attorneys) {
      filters.attorneys = Array.isArray(params.attorneys)
        ? params.attorneys
        : params.attorneys.split(",");
    }

    if (params?.law_firms) {
      filters.law_firms = Array.isArray(params.law_firms)
        ? params.law_firms
        : params.law_firms.split(",");
    }

    if (params?.input_query) {
      filters.input_query = params.input_query;
    }
  } catch (error) {
    console.error("Error processing search parameters:", error);
  }

  return filters;
}
