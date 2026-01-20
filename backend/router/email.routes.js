import express from 'express';
import { sendEmail, testEmailConnection } from '../controllers/email.controller.js';

const router = express.Router();

router.post('/send', sendEmail);
router.get('/test', testEmailConnection);

export default router;
