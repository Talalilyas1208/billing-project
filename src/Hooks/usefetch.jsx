import { useState, useEffect, useCallback } from "react";

const usefetch = (baseUrl = null, limits= 6 ,pages = 1) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pages);
  const [limit, setLimit] = useState(limits);

  const testing = useCallback(
    (url) => {
      if (!url) return url;
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}page=${page}&limit=${limit}`;
    },
    [page, limit],
  );

  const request = useCallback(
    async (customUrl = baseUrl, method = "GET", body = null) => {
      setLoading(true);
      setError(null);
      try {
        const results = method === "GET" ? testing(customUrl) : customUrl;
        const response = await fetch(results, {
          method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        if (method === "GET") {
          setData(result);
        }
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, testing],
  );

  useEffect(() => {
    if (baseUrl) {
      request(baseUrl, "GET");
    }
  }, [baseUrl, page, limit, request ]);

  const refetch = useCallback(() => {
    if (baseUrl) request(baseUrl, "GET");
  }, [baseUrl, request]);

  return {
    data,
    loading,
    error,
    request,
    refetch,
    page,
    setPage,
    limit,

  };
};

export default usefetch;