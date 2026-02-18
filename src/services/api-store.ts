import FetchResponse from '@/entities/FetchResponse'
import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://clipwords.me/store',
  withCredentials: true, // send cookie to backend
  params: {}
})

class APIClient<T> {
  endpoint: string // give it an endpoint property

  // initialize it with constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // `config`: optional parameter, cus we need it in clip hook
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`/${this.endpoint}/`, config)
      .then((res) => res.data) //extract data from response
  }

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}/`)
      .then((res) => res.data)
  }

  // get all playlist products
  getPlaylistProducts = (id: string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`${this.endpoint}/${id}/products/`, config)
      .then((res) => res.data) //extract data from response
  }

  getRelevant = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`${this.endpoint}/${id}/relevants/`, config)
      .then((res) => res.data)
  }

  // create interaction actions (history/like/list/..)
  post = (
    id: number | string, 
    action: string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`${this.endpoint}/${id}/${action}/`, data, config)
      .then((res) => res.data)
  }

  // get a given slug list
  getCourse = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}/`, config)
      .then((res) => res.data)
  }

}

export default APIClient