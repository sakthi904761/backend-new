import express from "express";
import {
  createStudentFees,
  getAllStudentFees,
  getStudentFeesById,
  updateStudentFees,
  deleteStudentFees,
  searchStudentFeesByRollNumber,
} from "../controllers/studentFeesController.js";

const router = express.Router();

// Specific routes must come before generic routes
router.get("/getall", getAllStudentFees);
router.get("/search/:rollNumber", searchStudentFeesByRollNumber);
router.post("/", createStudentFees);
router.put("/:id", updateStudentFees);
router.delete("/:id", deleteStudentFees);
router.get("/:id", getStudentFeesById);

export default router;
