import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
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

  const handleInspectClick = (email) => {
    const url = `/admin/user/${email}`;
    window.open(url, "_blank");
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
    {
      title: "Inspect",
      key: "inspect",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleInspectClick(record.email)}>
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="Admin">
      <Navbar />
      <div className="admin-content">
        <h6>Registered Users</h6>
        <div className="admin-table">
          <Table dataSource={users} columns={columns} rowKey="email" />
        </div>
      </div>
    </div>
  );
}

export default Admin;
