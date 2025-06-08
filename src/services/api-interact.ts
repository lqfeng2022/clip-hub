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

  // get all epbooks/view_histories/likes/playlists..
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

  // update a given id clip from liked/viewed
  put = (id: number | string, data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put(`/${this.endpoint}/${id}/`, data, config)
      .then((res) => res.data)
  }

  // create a playlist
  postList = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
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

  // update playlist title
  putList = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .put(`/${this.endpoint}/${id}/`, data, config)
      .then((res) => res.data)
  }

  // delete playlist
  deleteList = (
    id: number | string, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .delete(`/${this.endpoint}/${id}/`, config)
  }

  // delete playlist item
  deleteListItem = (
    ListId: number,
    listItemId: number,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .delete(`/${this.endpoint}/${ListId}/items/${listItemId}/`, config)
  }

  // create search
    // create interaction actions (history/like/epbook/..)
  postSearch = (
    data: any,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }

  // update search item
  putSearch = (
    id: number,
    data: any,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .put(`/${this.endpoint}/${id}/`, data, config)
  }
}

export default InteractAPIClient