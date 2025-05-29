import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/interact',
  withCredentials: true, // send cookie to backend
  params: {}
})

class InteractAPIClient {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getProfile = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data)
  }

}

export default InteractAPIClient