import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://clipwords.me/auth',
  params: {}
})

class APIClient {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  post = (data: any) => {
    return axiosInstance
      .post(`/${this.endpoint}/`, data)
      .then((res) => res.data)
  }
}

export default APIClient