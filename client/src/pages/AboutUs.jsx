import React from "react";
import Navbar from "../components/navbar/MainNavbar";
import "../css/about.css";

function AboutUs() {
  return (
    <div className="AboutUs">
      <Navbar />
      <div className="aboutus-content">
        <h3>Welcome to E-Data</h3>
        <p>
          <b>
            At E-Data, we are committed to revolutionizing the way data is
            managed and analyzed. Our mission is to empower individuals and
            organizations with innovative solutions to harness the power of data
            effectively.
          </b>
        </p>
        <div className="aboutus-section">
          <div className="aboutus-box">
            <h4>Our Vision</h4>
            <p>
              Our vision is to create a world where data-driven decisions are
              accessible to all, enabling growth, efficiency, and innovation.
            </p>
          </div>
          <div className="aboutus-box">
            <h4>Our Mission</h4>
            <p>
              We strive to provide cutting-edge technologies and intuitive
              platforms that simplify complex data processes, empowering our
              users to unlock insights and drive impactful outcomes.
            </p>
          </div>
          <div className="aboutus-box">
            <h4>Our Values</h4>
            <ul>
              <li>Innovation</li>
              <li>Integrity</li>
              <li>Collaboration</li>
              <li>Excellence</li>
            </ul>
          </div>
        </div>
        <p>
          At E-Data, we believe that every data point tells a story. Let us help
          you write yours.
        </p>
        <p>
          If you have any inquiries or suggestions, feel free to reach out to
          us.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
