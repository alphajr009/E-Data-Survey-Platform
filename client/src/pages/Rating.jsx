import React, { useEffect, useState } from "react";
import { Button, Form, Input, Col, Radio, Modal } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Paid from "../assets/paid.png";

function Rating() {
  let params = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [surveyData, setSurveyData] = useState(null);
  const [surveyName, setSurveyName] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

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
          await axios.get(`/api/question/getRating/${params.tokenID}`)
        ).data;
        console.log(data);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [params.tokenID]);

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
          <div className="sq-question">
            <h5> 1) How satisfied are you with our product quality? </h5>
            <Radio.Group>
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
              <Radio value="4">4</Radio>
              <Radio value="5">5</Radio>
            </Radio.Group>
          </div>

          <div className="sq-question">
            <h5> 2) How likely are you to recommend our product to others? </h5>
            <Radio.Group>
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
              <Radio value="4">4</Radio>
              <Radio value="5">5</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="survey-footer"></div>
      </div>
    </div>
  );
}

export default Rating;
