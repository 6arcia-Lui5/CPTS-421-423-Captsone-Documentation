import { Router } from "express";
import * as recordController from "../controllers/recordController"
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", recordController.getAllRecords);

router.get("/my", recordController.getMyRecords);

router.get("/:id", recordController.getRecordById);

router.post("/", requireAuth(), recordController.createRecord);

router.put("/:id", requireAuth(), recordController.updateRecord);

router.delete("/:id", requireAuth(), recordController.deleteRecord);

export default router;