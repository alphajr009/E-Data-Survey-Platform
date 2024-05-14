import React, { useState } from "react";
import { Select, Button } from "antd";
import "../css/home.css";
import Navbar from "../components/navbar/MainNavbar";

function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);

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
                <Button>Create Survey</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
