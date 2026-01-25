import { Student } from "../models/studentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// Student Registration
export const studentRegister = async (req, res, next) => {
  try {
    const { name, registrationNumber, class: studentClass, email, password, confirmPassword } = req.body;
    
    if (!name || !registrationNumber || !studentClass || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    // Check if student with same email already exists
    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered! Please use a different email.",
      });
    }

    // Check if registration number already exists
    const existingRoll = await Student.findOne({ registrationNumber });
    if (existingRoll) {
      return res.status(400).json({
        success: false,
        message: "Registration number already exists!",
      });
    }

    const student = await Student.create({
      name,
      registrationNumber,
      class: studentClass,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful! Please login to continue.",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNumber: student.registrationNumber,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Student Login
export const studentLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password!",
      });
    }

    // Find student and include password field
    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // Compare passwords
    const isPasswordCorrect = await student.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const studentData = {
      id: student._id,
      name: student.name,
      email: student.email,
      registrationNumber: student.registrationNumber,
      class: student.class,
    };

    res.status(200).json({
      success: true,
      message: "Login successful!",
      student: studentData,
    });
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, class: studentClass, email, parentName, parentEmail, parentPhone } = req.body;
  try {
    if (!name || !registrationNumber || !studentClass) {
      return next("Please Fill Full Form!", 400);
    }
    await Student.create({ 
      name, 
      registrationNumber, 
      class: studentClass,
      email,
      parentName,
      parentEmail,
      parentPhone
    });
    res.status(200).json({
      success: true,
      message: "Student Created!",
    });   
  } catch (err) {
    next(err);
  } 
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });   
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);
    
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
      student: deletedStudent,
    });   
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, registrationNumber, class: studentClass, email, parentName, parentEmail, parentPhone } = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    if (!name || !registrationNumber || !studentClass) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields: name, registrationNumber, class",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        registrationNumber,
        class: studentClass,
        email,
        parentName,
        parentEmail,
        parentPhone
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      student: updatedStudent,
    });   
  } catch (err) {
    next(err);
  }
};



