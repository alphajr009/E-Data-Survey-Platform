const pool = require("../db");

async function getRandomQuestions(type, number, topic) {
  let tableName;
  switch (type) {
    case "Multiple Questions":
      tableName = "questions";
      break;
    case "True/False Questions":
      tableName = "trufalse";
      break;
    case "Rating Questions":
      tableName = "rating";
      break;
    default:
      throw new Error("Invalid question type");
  }

  const query = `SELECT id FROM ${tableName} WHERE topic = ? ORDER BY RAND() LIMIT ?`;
  const [rows] = await pool.query(query, [topic, parseInt(number)]);

  const questions = rows.map((row) => row.id);
  return questions;
}

module.exports = { getRandomQuestions };
