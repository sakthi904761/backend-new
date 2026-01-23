import { StudentFees } from "../models/studentFeesSchema.js";
import { Student } from "../models/studentSchema.js";

export const createStudentFees = async (req, res, next) => {
  console.log(req.body);
  const { studentName, rollNumber, department, tuitionFees, hostelFees, messFees } = req.body;
  try {
    if (!studentName || !rollNumber || !department || !tuitionFees || !hostelFees || !messFees) {
      return next("Please Fill Full Form!", 400);
    }
    const totalFees = parseFloat(tuitionFees) + parseFloat(hostelFees) + parseFloat(messFees);
    await StudentFees.create({
      studentName,
      rollNumber,
      department,
      tuitionFees,
      hostelFees,
      messFees,
      totalFees,
    });
    res.status(200).json({
      success: true,
      message: "Student Fees Created!",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllStudentFees = async (req, res, next) => {
  try {
    const studentFees = await StudentFees.find();
    res.status(200).json({
      success: true,
      studentFees,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentFeesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentFees = await StudentFees.findById(id);
    if (!studentFees) {
      return next("Student Fees not found!", 404);
    }
    res.status(200).json({
      success: true,
      studentFees,
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudentFees = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { studentName, rollNumber, department, tuitionFees, hostelFees, messFees } = req.body;

    const updateData = {
      studentName,
      rollNumber,
      department,
      tuitionFees,
      hostelFees,
      messFees,
      totalFees: parseFloat(tuitionFees) + parseFloat(hostelFees) + parseFloat(messFees),
      updatedAt: Date.now(),
    };

    const studentFees = await StudentFees.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!studentFees) {
      return next("Student Fees not found!", 404);
    }

    res.status(200).json({
      success: true,
      message: "Student Fees Updated!",
      studentFees,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudentFees = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentFees = await StudentFees.findByIdAndDelete(id);

    if (!studentFees) {
      return next("Student Fees not found!", 404);
    }

    res.status(200).json({
      success: true,
      message: "Student Fees Deleted!",
    });
  } catch (err) {
    next(err);
  }
};

export const searchStudentFeesByRollNumber = async (req, res, next) => {
  try {
    const { rollNumber } = req.params;

    if (!rollNumber) {
      return res.status(400).json({
        success: false,
        message: "Roll number is required",
      });
    }

    // Find student fees by roll number
    const fees = await StudentFees.findOne({ rollNumber: rollNumber.trim() });

    if (!fees) {
      return res.status(404).json({
        success: false,
        message: `No fees record found for roll number: ${rollNumber}`,
      });
    }

    // Find student details including email and parent info
    const student = await Student.findOne({ registrationNumber: rollNumber.trim() });

    res.status(200).json({
      success: true,
      message: "Student fees record found",
      fees: {
        studentName: fees.studentName,
        rollNumber: fees.rollNumber,
        department: fees.department,
        tuitionFees: fees.tuitionFees || 0,
        hostelFees: fees.hostelFees || 0,
        messFees: fees.messFees || 0,
        labFees: fees.labFees || 0,
        totalFees: fees.totalFees || 0,
      },
      student: {
        name: student?.name || fees.studentName,
        email: student?.email || "",
        parentName: student?.parentName || "",
        parentEmail: student?.parentEmail || "",
        registrationNumber: student?.registrationNumber || rollNumber,
      },
    });
  } catch (err) {
    next(err);
  }
};
