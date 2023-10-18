import express from "express";
import {
  DeleteProduct, InsertProduct, SelectProducts,
  UpDateProduct,SelectProductEstoque, SelectProductsEstoque, InsertProductEstoque,
  UpDateProductEstoque, DeleteProductEstoque
} from "../controllers/produts.js";

const router = express.Router();

// router.get("/", SelectProducts)
// router.post("/", InsertProduct)
// router.patch("/:codigo", UpDateProduct)
// router.delete("/:codigo", DeleteProduct)

router.get("/:id", SelectProductEstoque)
router.get("/", SelectProductsEstoque)
router.post("/", InsertProductEstoque)
router.patch("/:codigo", UpDateProductEstoque)
router.delete("/:codigo", DeleteProductEstoque)

export default router
