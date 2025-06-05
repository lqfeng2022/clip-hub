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

  // get user profile
  getProfile = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data)
  }

  // get all epbooks/history/likes/playlists
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data) //extract data from response
  }

  // get a given id playlist
  get = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint + `/slug/${id}/`, config)
      .then((res) => res.data)
  }

  // create a playlist
  postList = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(this.endpoint, data, config)
      .then((res) => res.data)
  }

  // create list items
  postListItem = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/${id}/items/`, data, config)
      .then((res) => res.data)
  }

}

export default InteractAPIClient