import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/interact/profiles',
  withCredentials: true, // send cookie to backend
  params: {}
})

class ProfileAPIClient {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // get user profile
  getProfile = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get(`/${this.endpoint}/`, config)
      .then((res) => res.data)
  }

}

export default ProfileAPIClient