import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/store',
  params: {}
})

class APIClient<T> {
  endpoint: string; // give it an endpoint property

  // initialize it with constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // `config`: optional parameter, cus we need it in Clips hook
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data); //extract data from response
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data)
  }
}

export default APIClient;