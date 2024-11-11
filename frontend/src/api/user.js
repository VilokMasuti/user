
import axios from 'axios'

// Define the base URL for the users API
const API_URL = 'http://localhost:3000/api/users'


export const fetchUsers = async () => {
  // Making GET request to fetch users and returning the response data
  const response = await axios.get(API_URL)
  return response.data
}

// Function to create a new user using POST request
export const createUser = async (userData) => {
  // Sending a POST request to add a new user
  await axios.post(API_URL, userData)
}

// Function to update an existing user using PUT request
export const updateUser = async (id, userData) => {
  // Sending PUT request to update a specific user's details by ID
  await axios.put(`${API_URL}/${id}`, userData)
}

// Function to delete a user using DELETE request
export const deleteUser = async (id) => {
  // Sending DELETE request to remove a user by ID
  await axios.delete(`${API_URL}/${id}`)
}
