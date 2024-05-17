const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const { getRandomQuestions } = require("../utils/questionSelector");

router.post("/create", async (req, res) => {
  const { name, email, type, number, topic } = req.body;

  try {
    const questions = await getRandomQuestions(type, number, topic);

    const newSurvey = new Survey(name, email, type, number, topic, questions);

    await newSurvey.save();

    res.status(201).json({
      message: "Survey created successfully.",
      token: newSurvey.token,
    });
  } catch (error) {
    console.error("Error creating survey:", error);
    res.status(500).json({ error: "Failed to create survey." });
  }
});

router.post("/getsurveybytoken", async (req, res) => {
  const { tokenid } = req.body;

  try {
    const survey = await Survey.findByToken(tokenid);
    if (survey) {
      res.status(200).json(survey);
    } else {
      res.status(404).json({ error: "Survey not found." });
    }
  } catch (error) {
    console.error("Error getting survey by token:", error);
    res.status(500).json({ error: "Failed to get survey." });
  }
});

router.post("/getSurveyByID", async (req, res) => {
  const { email } = req.body;

  try {
    const responses = await Survey.getByEmail(email);
    res.status(200).json(responses);
  } catch (error) {
    console.error("Error getting responses by email:", error);
    res.status(500).json({ error: "Failed to get responses by email." });
  }
});

router.post("/delete", async (req, res) => {
  const { token } = req.body;

  try {
    await Survey.deleteByToken(token);
    res.status(200).json({ message: "Survey deleted successfully." });
  } catch (error) {
    console.error("Error deleting survey:", error);
    res.status(500).json({ error: "Failed to delete survey." });
  }
});

module.exports = router;
