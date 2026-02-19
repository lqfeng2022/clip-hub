import FetchResponse from '@/entities/FetchResponse'
import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://clipwords.me/interact',
  withCredentials: true, // send cookie to backend
  params: {}
})

class APIClient<T> {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // get all lists/chatsessions/searches
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`/${this.endpoint}/`, config)
      .then((res) => res.data) //extract data from response
  }

  // get a given slug list
  getList = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint + `/slug/${id}/`, config)
      .then((res) => res.data)
  }

  // get all list products
  getListProducts = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`${this.endpoint}/${id}/products/`, config)
      .then((res) => res.data) //extract data from response
  }

  // get all collections with the target product
  getProductLists = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint + `/products/${id}/`, config)
      .then((res) => res.data)
  }

  // get a given id chatsession
  getChatSession = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}/`, config)
      .then((res) => res.data)
  }

  // get all chat messages
  getChatMessages = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(`${this.endpoint}/${id}/messages/`, config)
      .then((res) => res.data) //extract data from response
  }

  // update a give id serach/list
  put = (id: number | string, data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put(`/${this.endpoint}/${id}/`, data, config)
      .then((res) => res.data)
  }

  // create a new list/search/chatsession
  post = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }

  // create a new listitem
  postListItem = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/${id}/items/`, data, config)
      .then((res) => res.data)
  }

  // create a new chatmessage
  postChatMessage = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/${id}/messages/`, data, config)
      .then((res) => res.data)
  }

  // create a new call
  postChatCall = (
    id: number | string, 
    data: any, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post(`/${this.endpoint}/${id}/calls/`, data, config)
      .then((res) => res.data)
  }

  // delete a given id list/chatSession
  delete = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete(`/${this.endpoint}/${id}/`, config)
  }

  // delete a given id listitem
  deleteListItem = (
    ListId: number, 
    listItemId: number, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .delete(`/${this.endpoint}/${ListId}/items/${listItemId}/`, config)
  }

  // delete multiple CollectionItems at once
  deleteListItemsBulk = (
    data: { product_id: number, listIds: number[] }, 
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      // send list in request body
      .delete(`${this.endpoint}/product/`, { ...config, data }) 
      .then(res => res.data)
  }

}

export default APIClient