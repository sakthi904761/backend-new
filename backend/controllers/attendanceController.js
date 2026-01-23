import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const markAttendance = async (req, res, next) => {
  const { attendanceData, date } = req.body;
  try {
    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      handleValidationError("Attendance data is missing or invalid!", 400);
    }
    
    const attendanceRecords = await Promise.all(attendanceData.map(async (record) => {
      const { student, status } = record;
      return await Attendance.create({ 
        student, 
        status,
        date: date ? new Date(date) : Date.now()
      });
    }));
    
    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      attendanceRecords
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate('student', 'name registrationNumber class email parentEmail')
      .sort({ date: -1 });
    
    // Transform data to include student name and date
    const transformedRecords = attendanceRecords.map((record) => ({
      _id: record._id,
      studentName: record.student?.name || 'Unknown Student',
      studentEmail: record.student?.email,
      studentId: record.student?._id,
      status: record.status,
      date: record.date || record.createdAt || new Date(),
    }));
    
    res.status(200).json({
      success: true,
      attendance: transformedRecords,
      attendanceRecords: transformedRecords
    });
  } catch (err) {
    next(err);
  }
};
