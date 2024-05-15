// Admin.jsx

import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Navbar from "../../components/navbar/MainNavbar";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/api/users/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Hometown",
      dataIndex: "hometown",
      key: "hometown",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="Admin">
      <Navbar />
      <div className="admin-content">
        <h6>Registered Users</h6>
        <div className="admin-table">
          <Table dataSource={users} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
