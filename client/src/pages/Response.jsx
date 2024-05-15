import React, { useState, useEffect } from "react";
import { Select, Table } from "antd";
import axios from "axios";
import Navbar from "../components/navbar/MainNavbar";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import "../css/response.css";

function Response() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axios
        .post("/api/survey/getSurveyByID", { email: currentUser.email })
        .then((response) => {
          const flattenedResponses = response.data[0];
          setResponses(flattenedResponses);
        })
        .catch((error) => {
          console.error("Error fetching responses:", error);
        });
    }
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (text, record) => (
        <a onClick={() => navigate(`/surveyDetails/${record.token}`)}>{text}</a>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
  ];

  const handleChange = (value) => {
    setSelectedResponse(value);
  };

  return (
    <div className="Response">
      <Navbar />
      <div className="response-content">
        <div className="hc-header">
          <h3 className="hc-header-title">Your Surveys</h3>
        </div>

        <div className="response-body">
          <b>Select Your Survey</b> <br />
          <br />
          <Select onChange={handleChange} style={{ width: 200 }}>
            {responses.map((response, index) => (
              <Select.Option key={index} value={response.name}>
                {response.name}
              </Select.Option>
            ))}
          </Select>
          <div className="survey-table">
            {selectedResponse && (
              <Table
                columns={columns}
                dataSource={responses.filter(
                  (response) => response.name === selectedResponse
                )}
                pagination={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response;