import FetchResponse from '@/entities/FetchResponse'
import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://clipwords.me/interact',
  withCredentials: true, // send cookie to backend
  params: {}
})

class InteractAPIClient<T> {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // get all eplikes/view histories/lists..
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`/${this.endpoint}/`, config)
      .then((res) => res.data) //extract data from response
  }

  // get a given id eplikes..
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

  // create a new list
  postList = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }

  // create a list item
  postListItem = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/${id}/items/`, data, config)
      .then((res) => res.data)
  }

  // update list title
  putList = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .put(`/${this.endpoint}/${id}/`, data, config)
      .then((res) => res.data)
  }

  // delete list
  deleteList = (
    id: number | string, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .delete(`/${this.endpoint}/${id}/`, config)
  }

  // delete list item
  deleteListItem = (
    ListId: number,
    listItemId: number,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .delete(`/${this.endpoint}/${ListId}/items/${listItemId}/`, config)
  }

  // create search
  postSearch = (
    data: any,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }

  // update search (soft delete search)
  putSearch = (
    id: number,
    data: any,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .put(`/${this.endpoint}/${id}/`, data, config)
  }

  // create a chat message
  postChatMessage = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/${id}/messages/`, data, config)
      .then((res) => res.data)
  }
}

export default InteractAPIClient