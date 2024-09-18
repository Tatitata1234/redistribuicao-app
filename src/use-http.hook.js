import axios from "axios"


export function useHttp(baseURL, headers) {

  const instance = axios.create({
    baseURL,
    headers,
  })

  async function get(url) {
    try {
      const response = await instance.get(url)
  
      return response.data
    } catch(error) {

      throw error
    }
  }

  async function post(url, data) {
    const response = await instance.post(url, data)

    return response.data
  }

  return {
    get,
    post
  }
}