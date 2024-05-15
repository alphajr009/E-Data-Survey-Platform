const express = require("express");
const router = express.Router();
const Response = require("../models/response");

router.post("/responseSave", async (req, res) => {
  const { name, email, token, qa } = req.body;

  const response = new Response();
  response.name = name;
  response.email = email;
  response.token = token;
  response.qa = qa;

  try {
    await response.save();
    res.status(200).json({ message: "Response saved successfully." });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ error: "Failed to save response." });
  }
});

module.exports = router;
