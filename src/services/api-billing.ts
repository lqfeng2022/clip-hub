import FetchResponse from '@/entities/FetchResponse'
import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://clipwords.me/billing',
  withCredentials: true, // send cookie to backend
  params: {}
})

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`/${this.endpoint}/`, config)
      .then((res) => res.data)
  }

  get = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get(`/${this.endpoint}/`, config)
      .then((res) => res.data)
  }

  post = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }

}

export default APIClient