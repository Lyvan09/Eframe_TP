import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then(json => { if (!ignore) setData(json); })
      .catch(err => { if (!ignore) setError(err.message); })
      .finally(()  => { if (!ignore) setLoading(false); });

    return () => { ignore = true; }; 
  }, [url]);

  return { data, loading, error };
}