import React, { useState, useEffect } from "react";
import { Select, Table, Button } from "antd";
import axios from "axios";
import Navbar from "../components/navbar/MainNavbar";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import "../css/response.css";

function Response() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [preview, setPreview] = useState("true");

  useEffect(() => {
    if (email) {
      axios
        .post("/api/survey/getSurveyByID", { email: email })
        .then((response) => {
          const flattenedResponses = response.data;
          setResponses(flattenedResponses);
        })
        .catch((error) => {
          console.error("Error fetching responses:", error);
        });
    }
  }, [email]);

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
        <a onClick={() => navigate(`/surveydetails/${record.token}`)}>{text}</a>
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handlePreview(record)}>Preview</Button>
      ),
    },
  ];

  const handlePreview = (record) => {
    let surveyType = "";
    if (record.type === "Multiple Questions") {
      surveyType = "multiple";
    } else if (record.type === "True/False Questions") {
      surveyType = "truefalse";
    } else if (record.type === "Rating Questions") {
      surveyType = "rating";
    }

    if (surveyType) {
      window.open(`/survey/${surveyType}/${record.token}/${preview}`, "_blank");
    }
  };

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
          <Select onChange={handleChange} placeholder="Select a survey">
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
