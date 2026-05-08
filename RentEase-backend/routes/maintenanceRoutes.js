const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createRequest,
  getRequests,
  updateMaintenanceStatus,
  deleteRequest,
  getMyRequests,
} = require("../controllers/maintenanceController");

router.post("/", protect, createRequest);
router.get("/", protect, getRequests);
router.put("/:id", protect, updateMaintenanceStatus);
router.delete("/:id", protect, deleteRequest);
router.get("/my-requests", protect, getMyRequests);

module.exports = router;