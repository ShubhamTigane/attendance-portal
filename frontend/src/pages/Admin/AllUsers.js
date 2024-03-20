import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch all users data
    const fetchAllUsers = async () => {
      try {
        // Make HTTP GET request to backend API to fetch users
        const response = await axios.get("/api/v1/auth/get-users");

        // Set the fetched users data in the state
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Call the function to fetch all users data
    fetchAllUsers();
  }, []);

  return (
    <Layout>
      <div className="containe">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <h1>All Users</h1>
            <table className="table table-bordered border-primary">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Check in</th>
                  <th>Check Out</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the users array and render each user */}
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 1 ? "Admin" : "User"}</td>
                    <td>
                      {user.checkIns.map((checkIn, idx) => (
                        <div key={idx}>
                          {new Date(checkIn).toLocaleString()}
                        </div>
                      ))}
                    </td>
                    <td>
                      {user.checkOuts.map((checkOut, idx) => (
                        <div key={idx}>
                          {new Date(checkOut).toLocaleString()}
                        </div>
                      ))}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
