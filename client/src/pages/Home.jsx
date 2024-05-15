import React, { useState } from "react";
import { Select, Button, Modal, Form, Input, Space, message } from "antd";
import axios from "axios";
import "../css/home.css";
import Navbar from "../components/navbar/MainNavbar";
import { CreditCardOutlined } from "@ant-design/icons";

function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [surveyName, setSurveyName] = useState("");
  const [price, setPrice] = useState(20);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isFormComplete = () => {
    return selectedTopic && selectedType && selectedNumber;
  };

  const handlePay = async () => {
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

      window.location.href = `/complete/${token}`;
    } catch (error) {
      console.error("There was an error creating the survey!", error);
      message.error("Failed to create the survey.");
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
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4">4</Select.Option>
                  <Select.Option value="5">5</Select.Option>
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

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <h4>Payment</h4>

          <span className="price-tag">Total Price: {price} USD</span>
        </div>
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
      </Modal>
    </div>
  );
}

export default Home;
