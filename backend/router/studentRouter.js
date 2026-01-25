import express from "express";
import { getAllStudents, createStudent, deleteStudent, updateStudent, studentRegister, studentLogin } from "../controllers/studentController.js";

const router = express.Router();

// Authentication routes
router.post('/register', studentRegister);
router.post('/login', studentLogin);

// CRUD routes
router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;


