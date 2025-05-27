import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/interact/profiles',
  withCredentials: true, // send cookie to backend
  params: {}
})

class APIClient {
  endpoint: string 

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get = () => {
    return axiosInstance
      .get(this.endpoint)
      .then((res) => res.data)
  }

}

export default APIClient