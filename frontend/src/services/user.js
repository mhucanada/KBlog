import axios from 'axios'
const baseUrl = '/api/users'

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  console.log(response)
  return response.data
}

export default { create }
