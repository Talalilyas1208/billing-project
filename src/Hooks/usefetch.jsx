import { useState, useEffect, useCallback } from "react";

const usefetch = (url = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (customUrl = url, method = "GET", body = null) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(customUrl, {
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
    [url]
  );

  useEffect(() => {
    if (url) {
      request(url, "GET");
    }
  }, [url, request]);

  const refetch = useCallback(() => {
    if (url) request(url, "GET");
  }, [url, request]);

  return { data, loading, error, request, refetch };
};

export default usefetch;