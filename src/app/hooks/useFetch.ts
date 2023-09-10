import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((responseData) => setData(responseData))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useFetch;
