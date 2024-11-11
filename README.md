# User Management API

A simple backend API to manage users using MongoDB, Express, and Node.js. This project allows you to perform CRUD (Create, Read, Update, Delete) operations on user data, including fields such as name, email, and date of birth.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete actions on users.
- **MongoDB Integration**: Stores user data in MongoDB.
- **Express API**: Provides RESTful API endpoints to interact with the user data.
- **Environment Configuration**: Uses `.env` file for sensitive environment configurations like MongoDB URI and server port.
- **CORS**: CORS is enabled for handling cross-origin requests.

## Technologies Used

- **Node.js**: JavaScript runtime used to build the backend server.
- **Express.js**: Framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM (Object Document Mapper) used for MongoDB interaction.
- **dotenv**: Loads environment variables from a `.env` file.
- **CORS**: Middleware to enable cross-origin resource sharing.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: The project is built using Node.js, so you will need Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- **MongoDB**: You need to have MongoDB set up on your machine or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/user-management-api.git
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root of your project and add the following configurations:
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
4. Start the Server
Now, you can run the server locally using:

bash
Copy code
npm start
