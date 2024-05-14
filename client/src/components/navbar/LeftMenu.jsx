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
        <Menu.Item key="location">
          <a href="/contact-us">
            <b className="b-white">Contact Us</b>
          </a>
        </Menu.Item>

        {user && (
          <>
            <Menu.Item key="projects">
              <a href="/projects">
                <b className="b-white">Projects</b>
              </a>
            </Menu.Item>
            <Menu.Item key="question">
              <a href="/questionnaire">
                <b className="b-white">Questionnaire</b>
              </a>
            </Menu.Item>
            <Menu.Item key="score">
              <a href="/ps-score">
                <b className="b-white">PS Score</b>
              </a>
            </Menu.Item>
          </>
        )}
      </Menu>
    );
  }
}

export default LeftMenu;
