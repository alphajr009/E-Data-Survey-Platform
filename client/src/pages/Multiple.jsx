// Multiple.jsx
import React, { useEffect, useState } from "react";
import { Select, Button, Modal, Form, Input, Col, Radio } from "antd";
import axios from "axios";
import "../css/multiple.css";
import { useParams } from "react-router-dom";

function Multiple() {
  let params = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [surveyData, setSurveyData] = useState(null);
  const [surveyName, setSurveyName] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        const data = (
          await axios.get(`/api/question/getQuestions/${params.tokenID}`)
        ).data;
        setSurveyQuestions(data.questions);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [params.tokenID]);

  const handleSubmit = async () => {
    const payload = {
      name: name,
      email: currentUser.email,
      token: params.tokenID,
      qa: responses,
    };

    try {
      await axios.post("/api/response/responseSave", payload);
      console.log("Response saved successfully.");
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  const handleRadioChange = (e, question) => {
    const newResponses = [...responses];
    const questionIndex = newResponses.findIndex(
      (item) => item.question === question
    );
    if (questionIndex !== -1) {
      newResponses[questionIndex].answer = e.target.value;
    } else {
      newResponses.push({ question: question, answer: e.target.value });
    }
    setResponses(newResponses);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 20,
          },
        }
      : null;

  return (
    <div className="survey">
      <div className="survey-content">
        <div className="survey-header">
          <h3>{surveyData && surveyData.name}</h3>
        </div>
        <br />

        <div className="survey-identity-questions">
          <Col span={24}>
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{
                layout: formLayout,
              }}
              autoComplete="off"
            >
              <div className="form-coloums">
                <Col span={12}>
                  <Form.Item name="Name">
                    <label>Name</label>
                    <Input
                      value={name}
                      placeholder="Enter Your Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="phone">
                    <label>Phone</label>
                    <Input
                      value={phone}
                      placeholder="Enter Your Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </div>
            </Form>{" "}
          </Col>
        </div>
        <br />
        <h6>Survey Questions</h6>
        <br />
        <div className="survey-questions">
          {surveyQuestions.map((question, index) => (
            <div className="sq-question" key={question.id}>
              <h5>
                {index + 1}) {question.question}
              </h5>
              <Radio.Group
                onChange={(e) => handleRadioChange(e, question.question)}
              >
                <Radio value={question.answer1}>{question.answer1}</Radio>
                <Radio value={question.answer2}>{question.answer2}</Radio>
                <Radio value={question.answer3}>{question.answer3}</Radio>
                <Radio value={question.answer4}>{question.answer4}</Radio>
              </Radio.Group>
            </div>
          ))}
        </div>
        <div className="survey-footer">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <Modal
          title="Response Submitted"
          visible={modalVisible}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <p>Your response has been submitted successfully.</p>
        </Modal>
      </div>
    </div>
  );
}

export default Multiple;
