import React, { useState } from "react";
import { Select, Button, Modal, Form, Input, Space, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import Navbar from "../components/navbar/MainNavbar";
import { CreditCardOutlined, ArrowLeftOutlined } from "@ant-design/icons";

function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [surveyName, setSurveyName] = useState("");
  const [price, setPrice] = useState(20);
  const [token, setToken] = useState(null);
  const [preview, setPreview] = useState("true");

  const [currentSlide, setCurrentSlide] = useState(1);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const topics = [
    "Customer Satisfaction",
    "Student Satisfaction",
    "Employee Satisfaction",
  ];
  const questionTypes = [
    "Multiple Questions",
    "True/False Questions",
    "Rating Questions",
  ];

  const handlePay = () => {
    setIsModalVisible(true);
    window.location.href = `/complete/${token}`;
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = async () => {
    if (token) {
      try {
        await axios.post("/api/survey/delete", { token });
      } catch (error) {
        console.error("There was an error deleting the survey!", error);
        message.error("Failed to delete the survey.");
      }
    }
    setIsModalVisible(false);
    setCurrentSlide(1);
    window.location.reload();
  };

  const isFormComplete = () => {
    return selectedTopic && selectedType && selectedNumber;
  };

  const showModal = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setIsModalVisible(true);
    const surveyData = {
      name: surveyName,
      topic: selectedTopic,
      type: selectedType,
      number: selectedNumber,
      email: currentUser.email,
    };

    try {
      const response = await axios.post("/api/survey/create", surveyData);
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.error("There was an error creating the survey!", error);
      message.error("Failed to create the survey.");
    }
  };

  const handlePreview = () => {
    let surveyType = "";
    if (selectedType === "Multiple Questions") {
      surveyType = "multiple";
    } else if (selectedType === "True/False Questions") {
      surveyType = "truefalse";
    } else if (selectedType === "Rating Questions") {
      surveyType = "rating";
    }

    if (surveyType) {
      window.open(`/survey/${surveyType}/${token}/${preview}`, "_blank");
    }
  };

  return (
    <div className="Home">
      <Navbar />
      <div className="home-content">
        <div className="hc-header">
          <h1 className="hc-header-title">
            The Fastest Survey Maker Ever Made
          </h1>
          <span className="hc-header-subtitle">
            Make beautiful free online surveys twice as fast
          </span>
        </div>
        <div className="hc-box-part">
          <div className="hcb-box">
            <h3>Create Survey</h3>
            <div className="hcb-about">
              <div className="hcb-topic">
                <h4>Enter Survey Name</h4>
                <Input
                  value={surveyName}
                  onChange={(e) => setSurveyName(e.target.value)}
                ></Input>
              </div>
              <br />
              <br />

              <div className="hcb-topic">
                <h4>Select Topic</h4>
                <div className="hcb-all-topics">
                  {topics.map((topic) => (
                    <div
                      key={topic}
                      className={`hcb-topic-box ${
                        selectedTopic === topic ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-question-type">
                <h4>Select Question Type</h4>
                <div className="hcb-all-topics">
                  {questionTypes.map((type) => (
                    <div
                      key={type}
                      className={`hcb-topic-box ${
                        selectedType === type ? "selected" : ""
                      }`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hc-question-type">
                <h4>How many questions</h4>
                <Select
                  placeholder="Select number of questions"
                  onChange={(value) => setSelectedNumber(value)}
                >
                  <Select.Option value="5">5</Select.Option>
                  <Select.Option value="6">6</Select.Option>
                  <Select.Option value="7">7</Select.Option>
                </Select>
              </div>

              <div className="go-pay-btn">
                <Button
                  type="primary"
                  onClick={showModal}
                  disabled={!isFormComplete()}
                >
                  Create Survey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {currentSlide === 1 && (
          <div className="slide">
            <h4>Preview Survey</h4>
            <p>Survey Name: {surveyName}</p>
            <p>Topic: {selectedTopic}</p>
            <p>Question Type: {selectedType}</p>
            <p>Number of Questions: {selectedNumber}</p>
            <div className="modal-btns-a">
              <Button type="primary" onClick={() => handlePreview()}>
                View Preview
              </Button>
              <Button type="primary" onClick={() => setCurrentSlide(2)}>
                Go to Payment
              </Button>
            </div>
          </div>
        )}
        {currentSlide === 2 && (
          <div className="slide">
            <div className="pay-modal-header">
              <div className="back-btn-modal">
                <ArrowLeftOutlined onClick={() => setCurrentSlide(1)} />{" "}
              </div>
              <div>
                <h4>Payment</h4>
              </div>
            </div>
            <span className="price-tag">Total Price: £ {price} </span>
            <br />
            <Form layout="vertical">
              <Form.Item className="av-icon" label="Card Number">
                <Input
                  prefix={<CreditCardOutlined />}
                  placeholder="1234 5678 9012 3456"
                />
              </Form.Item>
              <Form.Item label="Expiry Date (MM/YY)">
                <Space>
                  <Input style={{ width: "100px" }} placeholder="MM" />
                  <Input style={{ width: "100px" }} placeholder="YY" />
                </Space>
              </Form.Item>
              <Form.Item label="CVV">
                <Input style={{ width: "100px" }} placeholder="CVV" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block onClick={handlePay}>
                  Pay
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
