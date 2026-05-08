const express = require("express");
const router = express.Router();

console.log("Auth Routes Loaded");

const { registerUser, loginUser } = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.send("Test route working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;