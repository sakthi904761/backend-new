import express from "express";
import { createAssignment, getAllAssignments, deleteAssignment, deleteAllAssignments } from "../controllers/assignmentController.js";


const router = express.Router();

// Important: PUT delete-all BEFORE /:id so it matches first
router.post("/", createAssignment);
router.get("/getall", getAllAssignments);
router.delete("/delete-all", deleteAllAssignments);
router.delete("/:id", deleteAssignment);

export default router;
