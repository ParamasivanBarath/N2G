import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const AdminPanelLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check credentials
    if (username === "Admin" && password === "Admin@123") {
      // Redirect to the admin panel on successful login
      navigate("/admin-dashboard"); // Change this to your actual admin panel route
    } else {
      setErrorMessage("Username or password is incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#301934]">Admin Panel Login</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#301934] text-white py-2 rounded hover:bg-[#FFDF00] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelLogin;