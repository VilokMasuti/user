// Importing necessary React hooks and icons
import { useState, useEffect } from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'
// Importing functions from the API file to interact with the backend
import { fetchUsers, createUser, updateUser, deleteUser } from './api/user.js'

export default function App() {
  // State to store the list of users fetched from the API
  const [users, setUsers] = useState([])
  // State to store the form data for adding or updating a user
  const [formData, setFormData] = useState({ name: '', email: '', dateOfBirth: '' })
  // State to track which user is being edited (null if no user is being edited)
  const [editingId, setEditingId] = useState(null)

  // useEffect hook to load the list of users when the component mounts
  useEffect(() => {
    loadUsers()
  }, [])

  // Function to fetch and load all users from the API
  const loadUsers = async () => {
    // Fetching users and setting them in the state
    const data = await fetchUsers()
    setUsers(data)
  }

  // Function to handle form submission for both adding and updating users
  const handleSubmit = async (e) => {
    e.preventDefault() // Preventing the default form submission behavior

    // If editingId is set, we update an existing user
    if (editingId) {
      await updateUser(editingId, formData) // Calling the update function from API
      setEditingId(null) // Resetting the editing ID after updating
    } else {
      // If no editing, we add a new user
      await createUser(formData) // Calling the create function from API
    }

    // Clearing the form after submission
    setFormData({ name: '', email: '', dateOfBirth: '' })
    loadUsers() // Reloading the user list to reflect changes
  }

  // Function to handle deleting a user
  const handleDelete = async (id) => {
    // Calling the delete function from API to remove the user
    await deleteUser(id)
    loadUsers() // Reloading the user list after deletion
  }

  // Function to handle editing a user
  const handleEdit = (user) => {
    // Pre-filling the form with the user's current data
    setFormData({ name: user.name, email: user.email, dateOfBirth: user.dateOfBirth.split('T')[0] })
    setEditingId(user._id) // Setting the editing ID to the user's ID
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Background gradient and styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          {/* Title of the form */}
          <h1 className="text-xl  mb-3 uppercase">User Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input */}
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border-b"
            />
            {/* Email input */}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border-b"
            />
            {/* Date of Birth input */}
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full p-2 border-b"
            />
            {/* Submit button */}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editingId ? 'Update' : 'Submit'} {/* Conditional button text */}
            </button>
          </form>

          {/* List of users */}
          <ul className="mt-6">
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center py-2">
                <div>
                  <p>{user.name}</p> {/* Displaying the user's name */}
                  <p>{user.email}</p> {/* Displaying the user's email */}
                  <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p> {/* Displaying the formatted date of birth */}
                </div>
                <div className="flex space-x-2">
                  {/* Edit button */}
                  <button onClick={() => handleEdit(user)}>
                    <PencilIcon className="h-5 w-5 text-indigo-600" />
                  </button>
                  {/* Delete button */}
                  <button onClick={() => handleDelete(user._id)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
