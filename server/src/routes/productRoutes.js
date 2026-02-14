const express = require("express");
const { body } = require("express-validator");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/adminMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.get("/", requireAuth, getProducts);
router.get("/:id", requireAuth, getProductById);

router.post(
  "/",
  requireAuth,
  requireAdmin,
  [
    body("title").isString().isLength({ min: 2 }).withMessage("title required"),
    body("price").isNumeric().withMessage("price required"),
    body("brand").optional().isString(),
    body("category").optional().isString(),
    body("description").optional().isString(),
    body("stock").optional().isInt({ min: 0 }),
    body("images").optional().isArray()
  ],
  createProduct
);

router.put("/", (req, res) => res.status(405).json({ message: "Use /:id" }));

router.put("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

module.exports = router;
