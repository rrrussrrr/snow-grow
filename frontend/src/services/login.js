import axios from 'axios'
const baseUrl = 'http://localhost:3006/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const update = async (body, username) => {
    const response = await axios.patch('http://localhost:3006/api/users/' + username, body)
    return response.data
  }
  




export default { 
  login,
  update
}