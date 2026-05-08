const express = require("express");
const router = express.Router();
const { addToCart, getCartItems, removeFromCart, clearCart } = require("../controllers/cartController");
const protect  = require("../middleware/authMiddleware");



router.post("/add", protect, addToCart);


router.get("/", protect, getCartItems);

router.delete("/:cartItemId", protect, removeFromCart);
router.delete("/", protect, clearCart);


module.exports = router;