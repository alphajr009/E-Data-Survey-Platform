const pool = require("../db");
const { generateToken } = require("../utils/tokenGenerator");

class Survey {
  constructor(name, email, type, number, topic, questionIds) {
    this.name = name;
    this.email = email;
    this.token = generateToken(15);
    this.type = type;
    this.number = number;
    this.topic = topic;
    this.questionIds = questionIds;
  }

  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS surveys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        number INT NOT NULL,
        topic VARCHAR(255) NOT NULL,
        questions TEXT
      )
    `;
    try {
      await pool.query(query);
      console.log("Survey table created (if not existing)");
    } catch (error) {
      console.error("Error creating survey table:", error);
      throw error;
    }
  }

  async save() {
    const query = `
      INSERT INTO surveys (name , email, token, type, number, topic, questions)
      VALUES (?,?, ?, ?, ?, ?, ?)
    `;
    const values = [
      this.name,
      this.email,
      this.token,
      this.type,
      this.number,
      this.topic,
      JSON.stringify(this.questionIds),
    ];

    try {
      await pool.query(query, values);
      console.log("Survey created successfully.");
    } catch (error) {
      console.error("Error creating survey:", error);
      throw error;
    }
  }

  static async findByToken(token) {
    const query = "SELECT * FROM surveys WHERE token = ?";
    const [rows] = await pool.query(query, [token]);
    if (rows.length > 0) {
      const surveyData = rows[0];
      return new Survey(
        surveyData.name,
        surveyData.email,
        surveyData.type,
        surveyData.number,
        surveyData.topic,
        JSON.parse(surveyData.questions)
      );
    }
    return null;
  }
}

Survey.createTable();

module.exports = Survey;
