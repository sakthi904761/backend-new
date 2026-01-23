import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Absent with apology'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
attendanceSchema.index({ student: 1, date: 1 });
attendanceSchema.index({ date: 1 });

export default mongoose.model('Attendance', attendanceSchema);
