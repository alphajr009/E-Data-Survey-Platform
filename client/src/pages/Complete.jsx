import React, { useEffect, useState } from "react";
import { Select, Button, Modal, Form, Input, Space, message } from "antd";
import axios from "axios";
import "../css/complete.css";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/MainNavbar";

function Complete() {
  let params = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [surveyData, setSurveyData] = useState(null);
  const [surveyType, setSurveyType] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = (
          await axios.post("/api/survey/getsurveybytoken", {
            tokenid: params.tokenID,
          })
        ).data;
        setSurveyData(data);
        if (data.type === "Multiple Questions") {
          setSurveyType("multiple");
        } else if (data.type === "True/False Questions") {
          setSurveyType("truefalse");
        } else if (data.type === "Rating Questions") {
          setSurveyType("rating");
        }
      } catch (error) {
        console.log("error");
      }
    })();
  }, [params.tokenID]);

  return (
    <div className="complete-page">
      <Navbar />
      <div className="complete-content">
        <div className="payment-receipt-box">
          <div className="pcb-header">
            <h3>Payment Receipt</h3>
          </div>
          <hr />
          <div className="pcb-section">
            <br />
            <div className="pcs-address">
              <p>
                <b>E- Data Ltd.</b>
              </p>
              <span>edata@survery.com</span>
              <br />
              <span>44 77 8956 854</span>
            </div>
            <br />
            <br />
            <div className="pcb-bill-to">
              <h4>Bill To</h4>
              <div className="form-section">
                <b>Customer Name :</b> <span>{currentUser.name}</span>
              </div>
              <div className="form-section">
                <b>Email :</b> <span>{currentUser.email}</span>{" "}
              </div>
              <div className="form-section">
                <b>Category :</b>{" "}
                <span>{surveyData ? surveyData.topic : ""}</span>{" "}
              </div>
              <div className="form-section">
                <b>Question Type :</b>{" "}
                <span>{surveyData ? surveyData.type : ""}</span>{" "}
              </div>

              <div className="form-section">
                <b>Number of Questions :</b>{" "}
                <span>{surveyData ? surveyData.number : ""}</span>{" "}
              </div>
            </div>

            <div className="pcb-amount">
              <div className="form-section">
                <h3>Amount : £ 20</h3>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="copy-url">
          <div className="cu-content">
            <div className="url-box">
              <Input
                type="text"
                value={`http://edatasurvey.com/survey/${surveyType}/${params.tokenID}`}
                readOnly
              />
            </div>
            <br />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/survey/${surveyType}/${params.tokenID}`
                );
                message.success("URL copied to clipboard");
              }}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
