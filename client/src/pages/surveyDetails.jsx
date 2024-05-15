import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import Navbar from "../components/navbar/MainNavbar";
import { useParams } from "react-router-dom";
import "../css/home.css";

function SurveyDetails() {
  const params = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    axios
      .post("/api/response/getResponseByID", { token: params.tokenID })
      .then((response) => {
        const flattenedResponses = response.data[0];
        setResponses(flattenedResponses);
      })
      .catch((error) => {
        console.error("Error fetching responses:", error);
      });
  }, [params.tokenID]);

  useEffect(() => {
    (async () => {
      try {
        const data = (
          await axios.post("/api/survey/getsurveybytoken", {
            tokenid: params.tokenID,
          })
        ).data;
        setSurveyData(data);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [params.tokenID]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => (
        <Button onClick={() => handleView(record)}>View Response</Button>
      ),
    },
  ];

  const handleView = (record) => {
    setModalData(record.qa);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalData([]);
    setModalVisible(false);
  };

  return (
    <div className="surveyDetails">
      <Navbar />
      <div className="sd-content">
        <h6>Survey Details</h6>
        <div className="sd-c-info">
          <p>
            <span>
              <b>Name:</b>
            </span>{" "}
            {surveyData?.name}
          </p>

          <p>
            <span>
              <b>Survey Type:</b>
            </span>{" "}
            {surveyData?.type}
          </p>
          <p>
            <span>
              <b>Number of Questions:</b>
            </span>{" "}
            {surveyData?.number}
          </p>
          <p>
            <span>
              <b>Topic:</b>
            </span>{" "}
            {surveyData?.topic}
          </p>
        </div>
        <br />

        <div className="sd-table-content">
          <h5>Responses for this Survey</h5>
          <Table columns={columns} dataSource={responses} />
        </div>
      </div>

      <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
        {modalData.map((qa, index) => (
          <div key={index}>
            <p>
              <b>Question:</b> {qa.question}
            </p>
            <p>
              <b>Answer:</b> {qa.answer}
            </p>
            <br />
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default SurveyDetails;
