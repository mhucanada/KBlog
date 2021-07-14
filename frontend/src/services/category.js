import axios from 'axios'
const baseUrl = 'api/categories'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = (newElement) => {
    const request = axios.post(baseUrl, newElement)
    console.log(request.then((response) => response.data))
	return request.then((response) => response.data)
}

export default { getAll, create }
