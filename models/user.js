const pool = require("../db");
const bcrypt = require("bcrypt");

class User {
  constructor(
    email,
    password,
    name = "",
    phone = null,
    gender = null,
    hometown = null,
    birthday = null,
    address = null,
    isAdmin = false
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.gender = gender;
    this.hometown = hometown;
    this.birthday = birthday;
    this.address = address;
    this.isAdmin = isAdmin || false;
  }

  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        gender VARCHAR(10),
        hometown VARCHAR(255),
        birthday DATE,
        address TEXT,
        isAdmin BOOLEAN DEFAULT FALSE
      )
    `;
    try {
      await pool.query(query);
      console.log("User table created (if not existing)");
    } catch (error) {
      console.error("Error creating user table:", error);
      throw error;
    }
  }

  async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  async save() {
    await this.hashPassword();

    const query = `
      INSERT INTO users (name, email, password, phone, gender, hometown, birthday, address, isAdmin)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      this.name,
      this.email,
      this.password,
      this.phone,
      this.gender,
      this.hometown,
      this.birthday,
      this.address,
      this.isAdmin,
    ];

    try {
      const [result] = await pool.query(query, values);
      this.id = result.insertId;
      return this;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("Email already exists");
      } else {
        throw error;
      }
    }
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(query, [email]);
    if (rows.length > 0) {
      const userData = rows[0];
      return new User(
        userData.email,
        userData.password,
        userData.name,
        userData.phone,
        userData.gender,
        userData.hometown,
        userData.birthday,
        userData.address,
        userData.isAdmin
      );
    }
    return null;
  }
}

User.createTable();

module.exports = User;
