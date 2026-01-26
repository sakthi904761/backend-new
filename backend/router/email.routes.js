import express from 'express';
import { sendEmail, testEmailConnection, sendAttendanceReport, sendImmediateAttendanceReport, sendStudentAttendanceReport, sendFeesReport } from '../controllers/email.controller.js';

const router = express.Router();

router.post('/send', sendEmail);
router.post('/attendance-report', sendAttendanceReport);
router.post('/attendance-report-immediate', sendImmediateAttendanceReport);
router.post('/student-attendance-report', sendStudentAttendanceReport);
router.post('/fees-report', sendFeesReport);
router.get('/test', testEmailConnection);

export default router;
