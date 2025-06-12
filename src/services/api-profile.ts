import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/interact/profiles',
  withCredentials: true, // send cookie to backend, it's global default
  params: {}
})

class ProfileAPIClient {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // get user profile
  get = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get(`/${this.endpoint}/`, config)
      .then((res) => res.data)
  }

  // `any`: The put() method acts as a generic wrapper around axios 
  //  so it’s meant to support various data types (FormData, plain JSON, etc.).
  put = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }

}

export default ProfileAPIClient