const mongoose = require("mongoose");

const maintenanceSchema = mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);