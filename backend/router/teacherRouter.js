import express from "express";

import { createTeacher, getAllTeachers, loginTeacher, getTeacherById, updateTeacher, deleteTeacher } from "../controllers/teacherController.js";

const router = express.Router();

// Authentication routes
router.post('/register', createTeacher);
router.post('/login', loginTeacher);

// CRUD routes
router.get('/getall', getAllTeachers);
router.get('/:id', getTeacherById);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

// Keep backward compatibility
router.post('/', createTeacher);

export default router;
 
