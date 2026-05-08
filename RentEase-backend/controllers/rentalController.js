const Rental = require("../models/Rental");
const Product = require("../models/Product");

// ✅ CREATE RENTAL
const createRental = async (req, res) => {
  try {
    const { product: productId, months, address, city, pincode, deliveryDate, totalPrice } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const calculatedTotal = totalPrice || product.pricePerMonth * months;

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const rental = await Rental.create({
      user: req.user._id,
      product: productId,
      months,
      totalPrice: calculatedTotal,
      status: "active",
      address,
      city,
      pincode,
      deliveryDate,
      startDate: new Date(),
      endDate,
    });

    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET MY RENTALS
const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user._id }).populate("product");
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL RENTALS (Admin)
const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("product")
      .populate("user", "name email");
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ RETURN PRODUCT
const returnRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    rental.status = "returned";
    await rental.save();
    res.json({ message: "Product returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRental, getMyRentals, getAllRentals, returnRental };