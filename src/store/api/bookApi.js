import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { normalizeData, updateData } from "../utils/utils";
import { BOOK_ROWS_LIMIT } from "../constants/constants";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    // TODO: change to node_env
    baseUrl: "https://try.readme.io/https://api-pub.bitfinex.com/v2/book/",
  }),
  endpoints: (build) => ({
    book: build.query({
      query: ({ symbol, precision }) => `${symbol}/${precision}`,
      transformResponse: normalizeData,
      async onCacheEntryAdded(
        { symbol, precision },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }
      ) {
        const ws = new WebSocket(`wss://api-pub.bitfinex.com/ws/2`);

        ws.addEventListener("open", () => {
          ws.send(
            JSON.stringify({
              event: "subscribe",
              channel: "book",
              symbol: symbol,
              prec: precision,
              len: BOOK_ROWS_LIMIT,
            })
          );
        });

        try {
          await cacheDataLoaded;

          const listener = (event) => {
            const data = JSON.parse(event.data);

            // ignore action after initialisation
            if (Array.isArray(data) && Array.isArray(data[1])) {
              updateCachedData(() => {
                const book = data[1];

                if (Array.isArray(book[0])) {
                  // new connection
                  return normalizeData(book);
                }

                return updateData(getCacheEntry().data, book); // update
              });
            }
          };

          ws.addEventListener("message", listener);
        } catch {}

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useBookQuery } = bookApi;
