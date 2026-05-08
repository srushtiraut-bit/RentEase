const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    pricePerMonth: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stock: {
 type: Number,
 required: true,
 default: 1
},
securityDeposit: {
  type: Number,
  required: true
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
