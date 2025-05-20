import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

// `<T>`: add this generic type parameter 
interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Handle cancellations
    const controller = new AbortController(); // create a controller obj

    setLoading(true);
    apiClient
      // issue: 301 Redirect, fix it: '/videos' -> '/vidoes/'
      // why? Django backend default behavior
      .get<FetchResponse<T>>(
        endpoint, {signal: controller.signal}) // pass a signal argment
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        // error handler to skip the 'canceled' message
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // return a cleaner f 
    return () => controller.abort();
  }, []); // []: dependencies

  return {data, error, isLoading};
};

export default useData;