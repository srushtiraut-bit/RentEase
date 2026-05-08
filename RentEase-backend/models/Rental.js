const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    months: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "returned", "cancelled"],
      default: "active",
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rental", rentalSchema);