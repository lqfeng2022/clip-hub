import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

export interface Tags {
  id: number;
  title: string;
  slug: string;
}

export interface Genre {
  id: number;
  title: string;
  slug: string;
}


export interface Clip {
  id: number;
  title: string;
  cover: string;
  genre: Genre;
  tags: Tags[];
}

interface FetchclipsResponse {
  count: number;
  results: Clip[];
}

const ClipGrid = () => {
  const [clips, setclips] = useState<Clip[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Handle cancellations
    const controller = new AbortController(); // create a controller obj

    apiClient
      // issue: 301 Redirect, fix it: '/videos' -> '/vidoes/'
      // why? Django backend default behavior
      .get<FetchclipsResponse>('/videos/', 
        {signal: controller.signal}) // pass a signal argment
      .then((res) => setclips(res.data.results))
      .catch((err) => {
        // error handler to skip the 'canceled' message
        if (err instanceof CanceledError) return;
        setError(err.message)});
    // return a cleaner f 
    return () => controller.abort();
  }, []); // []: dependencies

  return {clips, error}
};

export default ClipGrid;