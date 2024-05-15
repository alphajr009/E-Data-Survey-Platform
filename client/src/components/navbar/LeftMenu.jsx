import React, { Component } from "react";
import { Menu } from "antd";

class LeftMenu extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/home">
            <b className="b-white">Home</b>
          </a>
        </Menu.Item>

        <Menu.Item key="response">
          <a href="/responses">
            <b className="b-white">Responses</b>
          </a>
        </Menu.Item>
        <Menu.Item key="location">
          <a href="/about-us">
            <b className="b-white">About Us</b>
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
