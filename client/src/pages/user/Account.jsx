import Navbar from "../../components/navbar/MainNavbar";
import {
  Layout,
  Button,
  Form,
  Input,
  Radio,
  Col,
  DatePicker,
  Select,
  Space,
  notification,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LockOutlined } from "@ant-design/icons";
import "../../css/about.css";

function Account() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("Edit Profile");
  const [city, setCity] = useState("");
  const [hometown, setHometown] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const { location } = window;

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/users/getUserByEmail", {
          email: user.email,
        });
        const data = response.data;
        setEmail(data.email);
        setName(data.name);
        setCity(data.hometown);
        setHometown(data.hometown);
        setPhone(data.phone);
        setGender(data.gender);
        setAddress(data.address);
        setBirthday(data.birthday);
      } catch (error) {
        console.log("error");
      }
    })();
  }, []);

  async function changeUserDetails(
    name,
    hometown,
    gender,
    phone,
    address,
    birthday,
    city
  ) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) throw new Error("User not found in local storage");

    const email = currentUser.email;
    try {
      const res = await axios.patch("/api/users/updateUser", {
        email,
        name,
        hometown,
        gender,
        phone,
        address,
        birthday,
        city,
      });
      console.log(res.data);

      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const onSaveButtonClick = () => {
    form
      .validateFields()
      .then((values) => {
        setName(values.Name);
        setCity(values.city);
        setGender(values.gender);
        setPhone(values.phone);
        setAddress(values.address);
        setBirthday(values.birthday);
        setHometown(values.city);
      })
      .catch((error) => {});
  };

  const onSaveButtonClick1 = async () => {
    try {
      const values = await form.validateFields();
      setName(values.Name);
      setCity(values.city);
      setGender(values.gender);
      setPhone(values.phone);
      setAddress(values.address);
      setBirthday(values.birthday);
      setHometown(values.city);

      await changeUserDetails(
        values.Name,
        values.city,
        values.gender,
        values.phone,
        values.address,
        values.birthday,
        values.hometown
      );
      notification.success({
        message: "Success",
        description: "Profile has been saved!",
      });
    } catch (error) {
      console.error("An error occurred:", error);
      notification.error({
        message: "Error",
        description: error.message || "Failed to save profile.",
      });
    }
  };

  const onCancelButtonClick = () => {
    form.resetFields();
    setEditMode(false);
    setSaveButtonText("Edit Profile");
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const initialValues = {
    Name: name,
    city: city,
    gender: gender,
    phone: phone,
    address: address,
    birthday: birthday,
  };

  form.setFieldsValue(initialValues);

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

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 24,
            style: {
              display: "flex",
              alignItems: "flex-end",
              paddingTop: "10px",
            },
          },
        }
      : null;

  const { TextArea } = Input;

  const onFormLayoutChange1 = ({ layout, ...values }) => {
    setFormLayout(layout);

    setName(values.Name);
    setCity(values.city);
    setGender(values.gender);
    setPhone(values.phone);
    setAddress(values.address);
    setBirthday(values.birthday);
  };

  return (
    <div className="Account">
      <Navbar />
      <div className="account-content">
        <Layout>
          <Button
            className="user-edit-btn"
            onClick={() => {
              if (editMode) {
                onCancelButtonClick();
              } else {
                setEditMode(true);
                setSaveButtonText("Save");
              }
            }}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </Button>
          <div className="profile-cover"></div>
          <div className="acc-form-sec">
            <Col span={24}>
              <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                onChange={onSaveButtonClick}
                initialValues={{
                  layout: formLayout,
                }}
                autoComplete="off"
              >
                <div className="form-coloums">
                  <Col span={12}>
                    <Form.Item
                      name="Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name!",
                        },
                      ]}
                    >
                      <label>Name</label>
                      <Input
                        value={name}
                        placeholder="Name"
                        disabled={!editMode}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your city!",
                        },
                      ]}
                    >
                      <label>City</label>
                      <Input
                        value={city}
                        placeholder="City"
                        disabled={!editMode}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender!",
                        },
                      ]}
                    >
                      <label>Gender: </label>
                      <Radio.Group
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        disabled={!editMode}
                      >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number!",
                        },
                      ]}
                    >
                      <label>Phone Number</label>
                      <Input
                        value={phone}
                        placeholder={phone}
                        disabled={!editMode}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email">
                      <label>Email</label>
                      <Input
                        value={email}
                        disabled={true}
                        suffix={<LockOutlined style={{ color: "#fff" }} />}
                      />
                    </Form.Item>

                    <Form.Item
                      name="birthday"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your birthday!",
                        },
                      ]}
                    >
                      <label>Birthday</label>
                      <Input
                        value={birthday}
                        placeholder="Birthday"
                        disabled={!editMode}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address!",
                        },
                      ]}
                    >
                      <label>Address</label>
                      <TextArea
                        value={address}
                        rows={4}
                        placeholder="Address"
                        disabled={!editMode}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item {...buttonItemLayout}>
                      <Button
                        className="user-submit-btn"
                        disabled={!editMode}
                        type="primary"
                        htmlType="submit"
                        onClick={onSaveButtonClick1}
                      >
                        Save
                      </Button>{" "}
                    </Form.Item>
                  </Col>
                </div>
              </Form>
            </Col>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default Account;
