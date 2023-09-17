import express from "express";
import { DeleteProduct, InsertProduct, SelectProducts, UpDateProduct } from "../controllers/produts.js";

const router = express.Router();

router.get("/", SelectProducts)
router.post("/", InsertProduct)
router.patch("/:codigo", UpDateProduct)
router.delete("/:codigo", DeleteProduct)

export default router