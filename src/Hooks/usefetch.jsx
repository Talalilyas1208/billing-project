import { useState, useEffect, useCallback } from "react";

const usefetch = (url = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. The Manual Request function (for POST, PUT, DELETE)
  const request = useCallback(async (customUrl, method = "GET", body = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(customUrl || url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const result = await response.json();
      return result; 
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  // 2. The Auto-Fetch logic (for initial GET on page load)
  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const result = await request(url);
          setData(result);
        } catch (err) {
          // Error is already handled inside request()
        }
      };
      fetchData();
    }
  }, [url, request]);

  // Return as an object for better flexibility
  return { data, loading, error, request };
};

export default usefetch;