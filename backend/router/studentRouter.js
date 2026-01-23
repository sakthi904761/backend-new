import express from "express";
import { getAllStudents, createStudent, deleteStudent, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;


