import axios, { AxiosRequestConfig } from 'axios'
import { FetchResponse } from './api-store'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/interact',
  withCredentials: true, // send cookie to backend
  params: {}
})

class InteractAPIClient<T> {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getProfile = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data)
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data) //extract data from response
  }

}

export default InteractAPIClient