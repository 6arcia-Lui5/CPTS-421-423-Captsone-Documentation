import { Router } from "express";
import * as collectionController from "../controllers/collectionController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all records (public)
router.get("/", collectionController.getAllCollections);
router.get("/:id", collectionController.getCollectionById);
router.post("/", collectionController.createCollection);

export default router;