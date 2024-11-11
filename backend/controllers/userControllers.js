
import User from '../model/UserModel.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database using the 'find()' method on the User model
    const users = await User.find();

    // If successful, return the users with a 200 status code (OK)
    res.status(200).json(users);
  } catch (err) {
    // If there’s an error, return a 500 status code (Internal Server Error) with the error message
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  // Destructure the necessary fields from the request body
  const { name, email, dateOfBirth } = req.body;

  // Validate input to ensure all required fields are provided
  if (!name || !email || !dateOfBirth) {
    // If any of the fields are missing, return a 400 status code (Bad Request) with a message
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new user in the database using the 'create()' method of the User model
    const newUser = await User.create({ name, email, dateOfBirth });

    // If successful, return the newly created user with a 201 status code (Created)
    res.status(201).json(newUser);
  } catch (err) {
    // If there’s an error, return a 400 status code (Bad Request) with the error message
    res.status(400).json({ message: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  // Extract the user ID from the request parameters (URL parameter)
  const { id } = req.params;
  // Destructure the user data (name, email, dateOfBirth) from the request body
  const { name, email, dateOfBirth } = req.body;

  try {
    // Find the user by their ID using the 'findById()' method on the User model
    const user = await User.findById(id);

    // If the user does not exist, return a 404 status code (Not Found) with a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the provided fields are not empty, update the user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    // Save the updated user document in the database
    const updatedUser = await user.save();

    // Return the updated user with a 200 status code (OK)
    res.status(200).json(updatedUser);
  } catch (err) {
    // If there’s an error, return a 400 status code (Bad Request) with the error message
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  // Extract the user ID from the request parameters (URL parameter)
  const { id } = req.params;

  try {
    // Find the user by their ID using the 'findById()' method on the User model
    const user = await User.findById(id);

    // If the user does not exist, return a 404 status code (Not Found) with a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user exists, delete them from the database using the 'deleteOne()' method
    await user.deleteOne();

    // Return a success message with a 200 status code (OK)
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    // If there’s an error, return a 500 status code (Internal Server Error) with the error message
    res.status(500).json({ message: err.message });
  }
};
