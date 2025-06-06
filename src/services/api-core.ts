import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/core',
  withCredentials: true, // send cookie to backend
  params: {}
})

class CoreAPIClient {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  post = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data, config)
      .then((res) => res.data)
  }
}

export default CoreAPIClient