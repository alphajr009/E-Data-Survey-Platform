import React, { Component } from "react";
import { Menu } from "antd";

class AdminMenu extends Component {
  render() {
    return (
      <div className="nav-a">
        <Menu className="nav-menu-items" mode="horizontal">
          <Menu mode="horizontal" key="place">
            <a href="/home">Home</a>
          </Menu>

          <Menu mode="horizontal" key="responses">
            <a href="/responses">Responses</a>
          </Menu>

          <Menu mode="horizontal" key="users">
            <a href="/admin/users">Users</a>
          </Menu>
        </Menu>
      </div>
    );
  }
}

export default AdminMenu;
