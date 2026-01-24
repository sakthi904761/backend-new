import express from "express";
import { getAllExams, addExam, deleteExam, deleteAllExams } from "../controllers/examController.js";

const router = express.Router();

// Important: PUT delete-all BEFORE /:id so it matches first
router.get('/getall', getAllExams);
router.post('/', addExam);
router.delete('/delete-all', deleteAllExams);
router.delete('/:id', deleteExam);

export default router; 
