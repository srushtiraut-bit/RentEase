const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createRental,
  getMyRentals,
  getAllRentals,
  returnRental,
} = require("../controllers/rentalController");

router.post("/", protect, createRental);
router.get("/my-rentals", protect, getMyRentals);
router.get("/", protect, getAllRentals);
router.put("/return/:id", protect, returnRental);

module.exports = router;