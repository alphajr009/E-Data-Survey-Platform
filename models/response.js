const pool = require("../db");

class Response {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        qa JSON NOT NULL
      )
    `;
    try {
      await pool.query(query);
      console.log("Response table created (if not existing)");
    } catch (error) {
      console.error("Error creating response table:", error);
      throw error;
    }
  }

  async save() {
    const query = `
      INSERT INTO responses (email, token, name, phone ,qa)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [this.email, this.token, this.name, JSON.stringify(this.qa)];

    try {
      await pool.query(query, values);
      console.log("Response saved successfully.");
    } catch (error) {
      console.error("Error saving response:", error);
      throw error;
    }
  }

  static async getByToken(token) {
    const query = `
      SELECT * FROM responses WHERE token = ?
    `;
    try {
      const results = await pool.query(query, [token]);
      return results;
    } catch (error) {
      console.error("Error getting responses by email:", error);
      throw error;
    }
  }
}

Response.createTable();

module.exports = Response;
