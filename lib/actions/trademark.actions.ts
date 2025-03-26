'use server'

export const getAllTradeMarkData = async (filters?: {
  status?: string[];
  owners?: string[];
  attorneys?: string[];
  law_firms?: string[];
  input_query?: string;
}) => {
  try {
    const requestBody = {
      input_query:filters?.input_query || "check",
      input_query_type: "",
      sort_by: "default",
      status: filters?.status || [],
      exact_match: false,
      date_query: false,
      owners: filters?.owners || [],
      attorneys:filters?.attorneys || [],
      law_firms:filters?.law_firms || [],
      mark_description_description: [],
      classes: [],
      page: 1,
      rows: 10,
      sort_order: "desc",
      states: [],
      counties: [],
    };

    const response = await fetch(
      "https://vit-tm-task.api.trademarkia.app/api/v3/us",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
          "Content-Type": "application/json",
          Origin: "http://localhost:3001",
          Priority: "u=1, i",
          Referer: "http://localhost:3001/",
          "Sec-CH-UA":
            '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "Sec-CH-UA-Mobile": "?0",
          "Sec-CH-UA-Platform": '"macOS"',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trademarks");
    }
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.log(error);
  }
};