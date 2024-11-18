import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch patients when component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch patients function
  const fetchPatients = async () => {
    try {
      // Use environment variable for API URL
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002'; // For React

      const response = await axios.get(`${apiUrl}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  // Filter and sort patients
  const filteredPatients = patients
    .filter((patient) =>
      patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.patient_name.localeCompare(b.patient_name);
      } else {
        return b.patient_name.localeCompare(a.patient_name);
      }
    });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Toggle Button (visible on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#301934] text-[#FFDF00] p-2 rounded"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#301934] text-[#FFDF00] fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 overflow-y-auto`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <ul>
            <li className="mb-2">
              <Link to="/admin-dashboard" className="hover:text-white">
                Patient List
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/admin-slot-management" className="hover:text-white">
                Slot Management
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/admin-therapist-management" className="hover:text-white">
                Therapist Management
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-auto">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Patient List</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Patient Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          {/* Filters Container */}
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Items Per Page Filter */}
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {[5, 10, 20, 30, 50].map((num) => (
                <option key={num} value={num}>
                  Show {num}
                </option>
              ))}
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>

         {/* Responsive Patient Table */}
<div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
  <table className="w-full table-auto min-w-max border-collapse">
    <thead className="bg-[#301934] text-[#FFDF00] text-left">
      <tr>
        <th className="p-3 text-left border-r border-[#FFDF00]/30">Patient ID</th>
        <th className="p-3 text-left border-r border-[#FFDF00]/30">Patient Name</th>
        <th className="p-3 text-left border-r border-[#FFDF00]/30">DOB</th>
        <th className="p-3 text-left border-r border-[#FFDF00]/30">Email</th>
        <th className="p-3 text-left border-r border-[#FFDF00]/30">Caregiver Name & Relation</th>
        <th className="p-3 text-left border-r border-[#FFDF00]/30">Caregiver Contact Number</th>
        <th className="p-3 text-left">Complaint Details</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 dark:text-gray-200">
      {filteredPatients.length > 0 ? (
        filteredPatients.slice(0, itemsPerPage).map((patient) => (
          <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="p-3 whitespace-nowrap border-r border-gray-200 dark:border-gray-600">{patient.patient_id}</td>
            <td className="p-3 whitespace-nowrap border-r border-gray-200 dark:border-gray-600">{patient.patient_name}</td>
            <td className="p-3 whitespace-nowrap border-r border-gray-200 dark:border-gray-600">{new Date(patient.dob).toLocaleDateString()}</td>
            <td className="p-3 whitespace-nowrap border-r border-gray-200 dark:border-gray-600">{patient.email}</td>
            <td className="p-3 whitespace-nowrap border-r border-gray-200 dark:border-gray-600">{patient.caregiver_name_relation}</td>
            <td className="p-3 whitespace-nowrap border-r border-gray-200 dark:border-gray-600">{patient.caregiver_contact_number}</td>
            <td className="p-3 whitespace-normal">{patient.complaint_details}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="p-3 text-center border-r border-gray-200 dark:border-gray-600">No patients found.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;