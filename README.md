# ✅ Task Tracker - MERN Full-Stack Application

Welcome to Task Tracker! This is a friendly, full-stack MERN project built to make managing your to-dos a breeze. With a secure login and a clean, simple interface powered by React, you can focus on what matters most: getting things done!

---

## ✨ Core Features

*   **Secure User Authentication**: Sign up and log in with a secure, token-based system (JWT).
*   **Full CRUD Functionality**: Easily **C**reate, **R**ead, **U**pdate, and **D**elete your tasks.
*   **Protected API Routes**: Your tasks are private and can only be accessed when you are logged in.
*   **Responsive Design**: A clean and modern UI that works on different screen sizes.

---

## 🛠️ Tech Stack

This project is built with the MERN stack and other modern technologies:

*   **Frontend**: **React.js** (with Vite), **React Router**, **Axios**
*   **Backend**: **Node.js**, **Express.js**
*   **Database**: **MongoDB** (with Mongoose)
*   **Authentication**: **JSON Web Tokens (JWT)**, **bcrypt.js**

---

## 🚀 Project Workflow & Local Setup

Follow this workflow to get the application running on your local machine.

### **Step 1: Clone the Repository**

First, clone the project from GitHub to your local machine.

```sh
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### **Step 2: Set Up the Backend**

The backend server connects to the database and handles all the API logic.

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create the environment file:**
    Create a new file named `.env` in the `backend` directory and add the following configuration. This file stores your secret keys and database connection string.

    ```env
    # Your MongoDB connection string (local or from a cloud service like Atlas)
    MONGO_URI=mongodb://localhost:27017/task-tracker

    # A secret key for signing JSON Web Tokens
    JWT_SECRET=your-very-secret-key-that-is-long

    # The port for the backend server
    PORT=5000
    ```

### **Step 3: Set Up the Frontend**

The frontend is the React application that users interact with.

1.  **Navigate to the frontend directory:**
    ```sh
    # From the backend folder
    cd ../frontend

    # Or from the root folder
    # cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

### **Step 4: Run the Application**

Now you can start both the backend and frontend servers. It's best to run them in separate terminal windows.

1.  **Run the Backend Server:**
    ```sh
    # In the /backend directory
    npm start
    ```
    The backend API will be running at `http://localhost:5000`.

2.  **Run the Frontend Application:**
    ```sh
    # In the /frontend directory
    npm run dev
    ```
    The React development server will start, and you can view the app in your browser at `http://localhost:5173`.

You're all set! The application should now be fully functional on your local machine.
