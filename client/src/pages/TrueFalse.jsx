import React, { useEffect, useState } from "react";
import { Button, Form, Input, Col, Radio, Modal } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Paid from "../assets/paid.png";

function TrueFalse() {
  let params = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [surveyData, setSurveyData] = useState(null);
  const [surveyName, setSurveyName] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentSuccessModalVisible, setPaymentSuccessModalVisible] =
    useState(false);

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (params.preview === "true") {
      setIsPreview(true);
    }
  }, [params.preview]);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const { data } = await axios.post("/api/survey/getsurveybytoken", {
          tokenid: params.tokenID,
        });
        setSurveyData(data);
      } catch (error) {
        console.log("Error fetching survey data:", error);
      }
    };

    fetchSurveyData();
  }, [params.tokenID]);

  useEffect(() => {
    const fetchTrueFalseQuestions = async () => {
      try {
        const { data } = await axios.get(
          `/api/question/getTrueFalse/${params.tokenID}`
        );
        setSurveyQuestions(data.questions);
      } catch (error) {
        console.log("Error fetching true/false questions:", error);
      }
    };

    fetchTrueFalseQuestions();
  }, [params.tokenID]);

  const handleRadioChange = (e, questionText) => {
    const newResponses = { ...responses };
    newResponses[questionText] = e.target.value === "True";
    setResponses(newResponses);
  };

  const closeModal1 = () => {
    setPaymentSuccessModalVisible(false);
  };

  const handleSubmit = async () => {
    const payload = {
      name: name,
      email: surveyData.email,
      token: params.tokenID,
      qa: Object.entries(responses).map(([questionText, answer]) => ({
        question: questionText,
        answer: answer ? "True" : "False",
      })),
    };

    try {
      await axios.post("/api/response/responseSave", payload);
      console.log("Response saved successfully.");
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const handleGetPaid = () => {
    setModalVisible(false);
    setPaymentSuccessModalVisible(true);
  };

  const handlePaidReload = () => {
    window.location.reload();
  };

  return (
    <div className="survey">
      <div className="survey-content">
        <div className="survey-header">
          <h3>{surveyData && surveyData.name}</h3>
        </div>
        <br />
        <div className="survey-identity-questions">
          <Col span={24}>
            <Form {...formItemLayout} autoComplete="off">
              <div className="form-coloums">
                <Col span={12}>
                  <Form.Item>
                    <label>Name</label>
                    <Input
                      value={name}
                      placeholder="Enter Your Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label>Phone</label>
                    <Input
                      value={phone}
                      placeholder="Enter Your Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </div>
            </Form>
          </Col>
        </div>
        <br />
        <h6>Survey Questions</h6>
        <br />
        <div className="survey-questions">
          {surveyQuestions.map((question) => (
            <div className="sq-question" key={question.id}>
              <h5>{question.question}</h5>
              <Radio.Group
                onChange={(e) => handleRadioChange(e, question.question)}
              >
                <Radio value="True">True</Radio>
                <Radio value="False">False</Radio>
              </Radio.Group>
            </div>
          ))}
        </div>
        <div className="survey-footer">
          <Button onClick={handleSubmit} disabled={isPreview}>
            Submit
          </Button>{" "}
        </div>

        <Modal
          title="Response Submitted"
          visible={modalVisible}
          onOk={closeModal}
          onCancel={closeModal}
          footer={null}
        >
          <p>Your response has been submitted successfully.</p>
          {surveyData && (
            <div className="survey-get-pay">
              <label>Number of Questions Answered </label>
              <Input value={surveyData.number} readOnly />
              <br />
              <br />
              <label>Payment Per Question </label>
              <Input value=" £ 0.5" readOnly />
              <br />
              <br />
              <label>Total Payment </label>
              <Input value={`£ ${surveyData.number * 0.5}`} readOnly />
              <br />
              <br />
              <label>Enter Your Account Number </label>
              <TextArea />
              <br />
              <div className="survey-footer">
                <Button onClick={handleGetPaid}>Get Paid</Button>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          visible={paymentSuccessModalVisible}
          onCancel={closeModal1}
          footer={null}
        >
          {surveyData && (
            <div className="header-title-mm">
              <h6>Payment Successful</h6>

              <div className="paymnet-s-img">
                <img
                  src={Paid}
                  alt=""
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <b>We successfully paid you {`£ ${surveyData.number * 0.5}`}</b>
            </div>
          )}
          <div className="survey-footer">
            <Button onClick={handlePaidReload}>Close</Button>
          </div>{" "}
        </Modal>
      </div>
    </div>
  );
}

export default TrueFalse;
