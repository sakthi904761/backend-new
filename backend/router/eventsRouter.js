import express from "express";
import { getAllEvents, createEvents, deleteEvents } from "../controllers/eventsController.js";

const router = express.Router();

router.get('/getall', getAllEvents);
router.post('/', createEvents);
router.delete('/:id', deleteEvents);


export default router;


