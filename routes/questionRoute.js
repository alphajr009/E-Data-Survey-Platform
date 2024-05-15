const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const pool = require("../db");

router.get("/getQuestions/:tokenID", async (req, res) => {
  const { tokenID } = req.params;

  try {
    const survey = await Survey.findByToken(tokenID);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found." });
    }

    const questionIds = survey.questionIds;
    if (!questionIds || questionIds.length === 0) {
      return res.status(200).json({ questions: [] });
    }

    const placeholders = questionIds.map(() => "?").join(",");
    const query = `SELECT * FROM questions WHERE id IN (${placeholders})`;
    const [rows] = await pool.query(query, questionIds);

    res.status(200).json({ questions: rows });
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Failed to get questions." });
  }
});

router.get("/getTrueFalse/:tokenID", async (req, res) => {
  const { tokenID } = req.params;

  try {
    const survey = await Survey.findByToken(tokenID);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found." });
    }

    const questionIds = survey.questionIds;
    if (!questionIds || questionIds.length === 0) {
      return res.status(200).json({ questions: [] });
    }

    const placeholders = questionIds.map(() => "?").join(",");
    const query = `SELECT * FROM trufalse WHERE id IN (${placeholders})`;
    const [rows] = await pool.query(query, questionIds);

    res.status(200).json({ questions: rows });
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Failed to get questions." });
  }
});

router.get("/getRating/:tokenID", async (req, res) => {
  const { tokenID } = req.params;

  try {
    const survey = await Survey.findByToken(tokenID);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found." });
    }

    const questionIds = survey.questionIds;
    if (!questionIds || questionIds.length === 0) {
      return res.status(200).json({ questions: [] });
    }

    const placeholders = questionIds.map(() => "?").join(",");
    const query = `SELECT * FROM rating WHERE id IN (${placeholders})`;
    const [rows] = await pool.query(query, questionIds);

    res.status(200).json({ questions: rows });
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Failed to get questions." });
  }
});

module.exports = router;
