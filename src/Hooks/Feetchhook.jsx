import { useEffect } from "react";
import { useState } from "react";

export default function Feetchhooks(url) {
  const [data, setdata] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ismount = true ;
    const hookfetch = async () => {
      setloading(true);
      try {
        const req = await fetch(url);

        const data = await req.json();

        console.log(data);
        if (ismount) {
          setdata(result);
          setError(null);
        }
      } catch (error) {
        if (ismount) {
          setError(err.message);
        }
      } finally {
        if (ismount) {
          setloading(false);
        }
      }
    
    };
      hookfetch()
       return () => {
      ismount = false;
    };
  },[url]);
  return { data, loading, error };
}
