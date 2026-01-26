import nodemailer from 'nodemailer';
import Attendance from '../models/attendanceSchema.js';
import { Student } from '../models/studentSchema.js';

// Function to create transporter with current env variables
const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim();

  console.log('📧 Email Config Check:');
  console.log('   User:', emailUser ? '✅ SET' : '❌ MISSING');
  console.log('   Pass length:', emailPass ? emailPass.length : '❌ MISSING');

  if (!emailUser || !emailPass) {
    throw new Error(`Email credentials incomplete - User: ${emailUser ? 'yes' : 'no'}, Pass: ${emailPass ? 'yes' : 'no'}`);
  }

  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    }
  });
};

export const sendEmail = async (req, res, next) => {
  try {
    const { to, subject, message } = req.body;

    // Validation
    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: to, subject, message',
      });
    }

    // Create transporter with fresh env vars
    const transporter = getTransporter();

    console.log('📧 Sending email...');
    console.log('   To:', to);
    console.log('   From:', process.env.EMAIL_FROM || process.env.EMAIL_USER);
    console.log('   Subject:', subject);

    // Verify transporter connection before sending
    console.log('🔍 Verifying transporter connection...');
    try {
      await transporter.verify();
      console.log('✅ Transporter verified successfully');
    } catch (verifyError) {
      console.error('❌ Transporter verification failed:', verifyError.message);
      throw new Error(`Email service verification failed: ${verifyError.message}`);
    }

    // Send email with detailed error handling
    let info;
    try {
      info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: to.trim(),
        subject: subject.trim(),
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
              <h2 style="margin: 0; font-size: 24px;">School Management System</h2>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
              <p style="color: #374151; margin-top: 0; font-size: 16px;">Hello,</p>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                ${message.replace(/\n/g, '<br/>')}
              </div>
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
                This email was sent from the School Management System.<br/>
                Please do not reply to this email.
              </p>
            </div>
            <div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p>
            </div>
          </div>
        `,
      });

      console.log('✅ Email sent successfully');
      console.log('   Message ID:', info.messageId);
      console.log('   Response:', info.response);

      return res.status(200).json({
        success: true,
        message: 'Email sent successfully!',
        messageId: info.messageId,
        response: info.response,
      });

    } catch (sendError) {
      console.error('❌ Email send failed during sendMail:', sendError);
      console.error('   Error Code:', sendError.code);
      console.error('   Error Message:', sendError.message);
      console.error('   Error Response:', sendError.response);
      throw sendError;
    }

  } catch (error) {
    console.error('❌ Email operation failed:', error.message);
    console.error('   Full Error:', error);
    
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check email credentials in .env file.',
        error: error.message
      });
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return res.status(500).json({
        success: false,
        message: 'Email service temporarily unavailable. Please try again.',
        error: error.message
      });
    }

    if (error.message && error.message.includes('Invalid email')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipient email address.',
        error: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Check server logs for details.',
      error: error.message,
    });
  }
};

// Test email connection
export const testEmailConnection = async (req, res) => {
  try {
    console.log('🔍 Testing email connection...');
    console.log('   EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
    
    // Create transporter with fresh env vars
    const transporter = getTransporter();
    
    // Verify connection
    const verified = await transporter.verify();
    
    if (verified) {
      console.log('✅ SMTP connection successful!');
      return res.status(200).json({
        success: true,
        message: 'Email service is working correctly!',
        verified: true,
        email: process.env.EMAIL_USER
      });
    }
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Email service connection failed: ' + error.message,
      verified: false
    });
  }
};

// Send Attendance Report to Parents
export const sendAttendanceReport = async (req, res) => {
  try {
    const { grade, startDate, endDate, attendanceDetails, present, absent, apologyAbsent, percentage, total } = req.body;

    // Validation
    if (!grade || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide grade (class), startDate, and endDate',
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // End of day

    console.log('📊 Generating Attendance Report...');
    console.log('   Class:', grade);
    console.log('   Period:', startDate, 'to', endDate);

    // If attendance details provided from frontend, use them directly
    if (attendanceDetails && Array.isArray(attendanceDetails) && attendanceDetails.length > 0) {
      console.log('   Using provided attendance details:', attendanceDetails.length, 'records');
      
      // Get all students in the class
      const students = await Student.find({ class: grade }).select('name email parentEmail parentName registrationNumber');

      if (students.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No students found in class ' + grade,
        });
      }

      console.log('   Found', students.length, 'students');

      // Build student stats from provided attendance details
      const studentStats = {};
      students.forEach(student => {
        studentStats[student._id?.toString()] = {
          name: student.name,
          regNum: student.registrationNumber,
          parentEmail: student.parentEmail,
          parentName: student.parentName,
          present: 0,
          absent: 0,
          apology: 0,
          total: 0
        };
      });

      // Process provided attendance data
      (attendanceDetails || []).forEach(record => {
        const studentId = record.id?.toString();
        if (studentStats[studentId]) {
          if (record.status === 'Present') studentStats[studentId].present++;
          else if (record.status === 'Absent') studentStats[studentId].absent++;
          else if (record.status === 'Absent with apology') studentStats[studentId].apology++;
          studentStats[studentId].total++;
        }
      });

      // Send emails to parents with student data
      const transporter = getTransporter();
      const results = {
        successful: 0,
        failed: 0,
        failedEmails: []
      };

      for (const student of students) {
        const stats = studentStats[student._id?.toString()];
        
        // Only send to parents with parent email
        if (!student.parentEmail) {
          console.log('   ⚠️  No parent email for student:', student.name);
          continue;
        }

        const attendancePercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
        const statusColor = attendancePercentage >= 80 ? '#10b981' : attendancePercentage >= 60 ? '#f59e0b' : '#ef4444';
        const statusText = attendancePercentage >= 80 ? 'Good' : attendancePercentage >= 60 ? 'Fair' : 'Poor';

        try {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: student.parentEmail,
            subject: `📚 Attendance Report - ${student.name} (Grade ${grade})`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
                  <h2 style="margin: 0; font-size: 24px;">📊 Attendance Report</h2>
                  <p style="margin: 5px 0 0 0; font-size: 14px;">School Management System</p>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
                  <p style="color: #374151; margin-top: 0; font-size: 16px;">Dear ${student.parentName || 'Parent'},</p>
                  
                  <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
                    Please find the attendance report for your child below.
                  </p>

                  <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Student Information</h3>
                    <p style="margin: 8px 0;"><strong>Name:</strong> ${student.name}</p>
                    <p style="margin: 8px 0;"><strong>Registration #:</strong> ${student.registrationNumber}</p>
                    <p style="margin: 8px 0;"><strong>Class:</strong> ${grade}</p>
                    <p style="margin: 8px 0;"><strong>Report Period:</strong> ${new Date(startDate).toDateString()} to ${new Date(endDate).toDateString()}</p>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Attendance Summary</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #10b981;">${stats.present}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #047857;">Days Present</p>
                      </div>
                      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #f59e0b;">${stats.absent}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #b45309;">Days Absent</p>
                      </div>
                      <div style="background: #fecaca; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #ef4444;">${stats.apology}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #991b1b;">Absent w/ Apology</p>
                      </div>
                      <div style="background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #3b82f6;">${stats.total}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">Total Days</p>
                      </div>
                    </div>

                    <div style="background: ${statusColor}20; border-left: 4px solid ${statusColor}; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${statusColor};">
                        ${attendancePercentage}% Attendance (${statusText})
                      </p>
                    </div>
                  </div>

                  <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                    <p style="margin: 0; color: #1e40af; font-size: 13px;">
                      <strong>Note:</strong> This is an automated report. For any concerns or clarifications regarding attendance, please contact the school administration.
                    </p>
                  </div>

                  <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
                    Best regards,<br>
                    <strong>School Management System</strong>
                  </p>
                </div>
                <div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                  <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p>
                </div>
              </div>
            `,
          });
          results.successful++;
          console.log('   ✅ Email sent to parent of', student.name);
        } catch (error) {
          results.failed++;
          results.failedEmails.push({ 
            student: student.name, 
            parent_email: student.parentEmail, 
            error: error.message 
          });
          console.log('   ❌ Failed to send to parent of', student.name);
        }
      }

      console.log('✅ Attendance report sending completed');
      console.log('   Successful:', results.successful);
      console.log('   Failed:', results.failed);

      return res.status(200).json({
        success: true,
        message: `Attendance reports sent to ${results.successful}/${students.length} parents!`,
        results,
        stats: {
          totalStudents: students.length,
          totalRecords: attendanceDetails.length,
          period: { startDate, endDate }
        }
      });
    }

    // Fallback: Query from database if no attendance details provided
    // Get all students in the class (using 'class' field in database)
    const students = await Student.find({ class: grade }).select('name email parentEmail parentName registrationNumber');

    if (students.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No students found in class ' + grade,
      });
    }

    console.log('   Found', students.length, 'students');

    // Get attendance records for the period
    const attendanceRecords = await Attendance.find({
      createdAt: { $gte: start, $lte: end },
      student: { $in: students.map(s => s._id) }
    }).populate('student');

    console.log('   Found', attendanceRecords.length, 'attendance records');

    // Calculate attendance stats per student
    const studentStats = {};
    students.forEach(student => {
      studentStats[student._id] = {
        name: student.name,
        regNum: student.registrationNumber,
        parentEmail: student.parentEmail,
        parentName: student.parentName,
        present: 0,
        absent: 0,
        apology: 0,
        total: 0
      };
    });

    attendanceRecords.forEach(record => {
      const studentId = record.student._id.toString();
      if (studentStats[studentId]) {
        if (record.status === 'Present') studentStats[studentId].present++;
        else if (record.status === 'Absent') studentStats[studentId].absent++;
        else if (record.status === 'Absent with apology') studentStats[studentId].apology++;
        studentStats[studentId].total++;
      }
    });

    // Send emails to parents with student data
    const transporter = getTransporter();
    const results = {
      successful: 0,
      failed: 0,
      failedEmails: []
    };

    for (const student of students) {
      const stats = studentStats[student._id];
      
      // Only send to parents with parent email
      if (!student.parentEmail) {
        console.log('   ⚠️  No parent email for student:', student.name);
        continue;
      }

      const attendancePercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
      const statusColor = attendancePercentage >= 80 ? '#10b981' : attendancePercentage >= 60 ? '#f59e0b' : '#ef4444';
      const statusText = attendancePercentage >= 80 ? 'Good' : attendancePercentage >= 60 ? 'Fair' : 'Poor';

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: student.parentEmail,
          subject: `📚 Attendance Report - ${student.name} (Grade ${grade})`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
                <h2 style="margin: 0; font-size: 24px;">📊 Attendance Report</h2>
                <p style="margin: 5px 0 0 0; font-size: 14px;">School Management System</p>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
                <p style="color: #374151; margin-top: 0; font-size: 16px;">Dear ${student.parentName || 'Parent'},</p>
                
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
                  Please find the attendance report for your child below.
                </p>

                <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Student Information</h3>
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${student.name}</p>
                  <p style="margin: 8px 0;"><strong>Registration #:</strong> ${student.registrationNumber}</p>
                  <p style="margin: 8px 0;"><strong>Class:</strong> ${grade}</p>
                  <p style="margin: 8px 0;"><strong>Report Period:</strong> ${new Date(startDate).toDateString()} to ${new Date(endDate).toDateString()}</p>
                </div>

                <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Attendance Summary</h3>
                  
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #10b981;">${stats.present}</p>
                      <p style="margin: 5px 0 0 0; font-size: 12px; color: #047857;">Days Present</p>
                    </div>
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #f59e0b;">${stats.absent}</p>
                      <p style="margin: 5px 0 0 0; font-size: 12px; color: #b45309;">Days Absent</p>
                    </div>
                    <div style="background: #fecaca; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #ef4444;">${stats.apology}</p>
                      <p style="margin: 5px 0 0 0; font-size: 12px; color: #991b1b;">Absent w/ Apology</p>
                    </div>
                    <div style="background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #3b82f6;">${stats.total}</p>
                      <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">Total Days</p>
                    </div>
                  </div>

                  <div style="background: ${statusColor}20; border-left: 4px solid ${statusColor}; padding: 15px; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${statusColor};">
                      ${attendancePercentage}% Attendance (${statusText})
                    </p>
                  </div>
                </div>

                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                  <p style="margin: 0; color: #1e40af; font-size: 13px;">
                    <strong>Note:</strong> This is an automated report. For any concerns or clarifications regarding attendance, please contact the school administration.
                  </p>
                </div>

                <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
                  Best regards,<br>
                  <strong>School Management System</strong>
                </p>
              </div>
              <div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p>
              </div>
            </div>
          `,
        });
        results.successful++;
        console.log('   ✅ Email sent to parent of', student.name);
      } catch (error) {
        results.failed++;
        results.failedEmails.push({ 
          student: student.name, 
          parent_email: student.parentEmail, 
          error: error.message 
        });
        console.log('   ❌ Failed to send to parent of', student.name);
      }
    }

    console.log('✅ Attendance report sending completed');
    console.log('   Successful:', results.successful);
    console.log('   Failed:', results.failed);

    return res.status(200).json({
      success: true,
      message: `Attendance reports sent to ${results.successful}/${students.length} parents!`,
      results,
      stats: {
        totalStudents: students.length,
        totalRecords: attendanceRecords.length,
        period: { startDate, endDate }
      }
    });

  } catch (error) {
    console.error('❌ Attendance report failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send attendance reports: ' + error.message,
    });
  }
};

// Send immediate attendance report (for current session)
export const sendImmediateAttendanceReport = async (req, res) => {
  try {
    const { grade, attendanceDetails, present, absent, apologyAbsent, percentage, date } = req.body;

    // Validation
    if (!grade || !attendanceDetails || !Array.isArray(attendanceDetails) || attendanceDetails.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide grade (class) and attendanceDetails array',
      });
    }

    console.log('📧 Sending Immediate Attendance Report...');
    console.log('   Class:', grade);
    console.log('   Date:', date);
    console.log('   Records:', attendanceDetails.length);

    // Get all students in the class
    const students = await Student.find({ class: grade }).select('name email parentEmail parentName registrationNumber');

    if (students.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No students found in class ' + grade,
      });
    }

    console.log('   Found', students.length, 'students');

    // Build student stats from provided attendance details
    const studentStats = {};
    students.forEach(student => {
      studentStats[student._id?.toString()] = {
        name: student.name,
        regNum: student.registrationNumber,
        parentEmail: student.parentEmail,
        parentName: student.parentName,
        present: 0,
        absent: 0,
        apology: 0,
        total: 0
      };
    });

    // Process provided attendance data
    (attendanceDetails || []).forEach(record => {
      const studentId = record.id?.toString();
      if (studentStats[studentId]) {
        if (record.status === 'Present') studentStats[studentId].present++;
        else if (record.status === 'Absent') studentStats[studentId].absent++;
        else if (record.status === 'Absent with apology') studentStats[studentId].apology++;
        studentStats[studentId].total++;
      }
    });

    // Send emails to parents with student data
    const transporter = getTransporter();
    const results = {
      successful: 0,
      failed: 0,
      failedEmails: []
    };

    for (const student of students) {
      const stats = studentStats[student._id?.toString()];
      
      // Only send to parents with parent email
      if (!student.parentEmail) {
        console.log('   ⚠️  No parent email for student:', student.name);
        continue;
      }

      const attendancePercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
      const statusColor = attendancePercentage >= 80 ? '#10b981' : attendancePercentage >= 60 ? '#f59e0b' : '#ef4444';
      const statusText = attendancePercentage >= 80 ? 'Good' : attendancePercentage >= 60 ? 'Fair' : 'Poor';
      const reportDate = date ? new Date(date).toDateString() : new Date().toDateString();

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: student.parentEmail,
          subject: `📚 Daily Attendance Report - ${student.name} (${reportDate})`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
                <h2 style="margin: 0; font-size: 24px;">📊 Daily Attendance Report</h2>
                <p style="margin: 5px 0 0 0; font-size: 14px;">School Management System</p>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
                <p style="color: #374151; margin-top: 0; font-size: 16px;">Dear ${student.parentName || 'Parent'},</p>
                
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
                  Here's today's attendance record for your child:
                </p>

                <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Student Information</h3>
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${student.name}</p>
                  <p style="margin: 8px 0;"><strong>Registration #:</strong> ${student.registrationNumber}</p>
                  <p style="margin: 8px 0;"><strong>Class:</strong> ${grade}</p>
                  <p style="margin: 8px 0;"><strong>Report Date:</strong> ${reportDate}</p>
                </div>

                <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Today's Attendance Status</h3>
                  
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 28px; font-weight: bold; color: #10b981;">${stats.present}</p>
                      <p style="margin: 5px 0 0 0; font-size: 13px; color: #047857;">Present</p>
                    </div>
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 28px; font-weight: bold; color: #f59e0b;">${stats.absent}</p>
                      <p style="margin: 5px 0 0 0; font-size: 13px; color: #b45309;">Absent</p>
                    </div>
                    <div style="background: #fecaca; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 28px; font-weight: bold; color: #ef4444;">${stats.apology}</p>
                      <p style="margin: 5px 0 0 0; font-size: 13px; color: #991b1b;">Apology</p>
                    </div>
                    <div style="background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0; font-size: 28px; font-weight: bold; color: #3b82f6;">${stats.total}</p>
                      <p style="margin: 5px 0 0 0; font-size: 13px; color: #1e40af;">Total</p>
                    </div>
                  </div>

                  <div style="background: ${statusColor}20; border-left: 4px solid ${statusColor}; padding: 15px; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${statusColor};">
                      ${attendancePercentage}% Attendance (${statusText})
                    </p>
                  </div>
                </div>

                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                  <p style="margin: 0; color: #1e40af; font-size: 13px;">
                    <strong>Note:</strong> This is an automated daily report. For any concerns, please contact the school administration.
                  </p>
                </div>

                <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
                  Best regards,<br>
                  <strong>School Management System</strong>
                </p>
              </div>
              <div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p>
              </div>
            </div>
          `,
        });
        results.successful++;
        console.log('   ✅ Email sent to parent of', student.name);
      } catch (error) {
        results.failed++;
        results.failedEmails.push({ 
          student: student.name, 
          parent_email: student.parentEmail, 
          error: error.message 
        });
        console.log('   ❌ Failed to send to parent of', student.name);
      }
    }

    console.log('✅ Immediate attendance report sending completed');
    console.log('   Successful:', results.successful);
    console.log('   Failed:', results.failed);

    return res.status(200).json({
      success: true,
      message: `Attendance reports sent to ${results.successful}/${students.length} parents!`,
      results,
      stats: {
        totalStudents: students.length,
        totalRecords: attendanceDetails.length,
        date: date,
        present: present,
        absent: absent,
        apologyAbsent: apologyAbsent,
        percentage: percentage
      }
    });

  } catch (error) {
    console.error('❌ Immediate attendance report failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send attendance reports: ' + error.message,
    });
  }
};

// Send Individual Student Attendance Report (Personalized per student)
export const sendStudentAttendanceReport = async (req, res) => {
  try {
    const { rollNumber, startDate, endDate, studentEmail, parentEmail } = req.body;

    if (!rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a roll number',
      });
    }

    console.log('📧 Starting personalized attendance report sending...');
    console.log('   Roll Number:', rollNumber);
    console.log('   Period:', startDate, 'to', endDate);

    // Get student details
    const student = await Student.findOne({ registrationNumber: rollNumber.trim() });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found for roll number: ${rollNumber}`,
      });
    }

    console.log('   Student:', student.name);

    // Build date range
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    // Get attendance records for this specific student
    const attendanceRecords = await Attendance.find({
      student: student._id,
      createdAt: { $gte: start, $lte: end }
    }).populate('student');

    console.log('   Found', attendanceRecords.length, 'attendance records');

    // Calculate attendance stats for this student
    let stats = {
      name: student.name,
      regNum: student.registrationNumber,
      parentEmail: student.parentEmail,
      studentEmail: student.email,
      parentName: student.parentName,
      class: student.class,
      present: 0,
      absent: 0,
      apology: 0,
      total: 0
    };

    attendanceRecords.forEach(record => {
      if (record.status === 'Present') stats.present++;
      else if (record.status === 'Absent') stats.absent++;
      else if (record.status === 'Absent with apology') stats.apology++;
      stats.total++;
    });

    const results = {
      successful: 0,
      failed: 0,
      failedEmails: [],
    };

    const transporter = getTransporter();
    const attendancePercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
    const statusColor = attendancePercentage >= 80 ? '#10b981' : attendancePercentage >= 60 ? '#f59e0b' : '#ef4444';
    const statusText = attendancePercentage >= 80 ? 'Good' : attendancePercentage >= 60 ? 'Fair' : 'Poor';

    const emailTemplate = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
          <h2 style="margin: 0; font-size: 24px;">📊 Attendance Report</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px;">School Management System</p>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #374151; margin-top: 0; font-size: 16px;">Dear {RECIPIENT_NAME},</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
            {GREETING_TEXT}
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Student Information</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${student.name}</p>
            <p style="margin: 8px 0;"><strong>Registration #:</strong> ${student.registrationNumber}</p>
            <p style="margin: 8px 0;"><strong>Class:</strong> ${student.class}</p>
            <p style="margin: 8px 0;"><strong>Report Period:</strong> ${start.toDateString()} to ${end.toDateString()}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #1f3a57; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Attendance Summary</h3>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
              <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #10b981;">${stats.present}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #047857;">Days Present</p>
              </div>
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #f59e0b;">${stats.absent}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #b45309;">Days Absent</p>
              </div>
              <div style="background: #fecaca; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #ef4444;">${stats.apology}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #991b1b;">Absent w/ Apology</p>
              </div>
              <div style="background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #3b82f6;">${stats.total}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">Total Days</p>
              </div>
            </div>

            <div style="background: ${statusColor}20; border-left: 4px solid ${statusColor}; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${statusColor};">
                ${attendancePercentage}% Attendance (${statusText})
              </p>
            </div>
          </div>

          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 13px;">
              <strong>Note:</strong> This is an automated report. For any concerns or clarifications regarding attendance, please contact the school administration.
            </p>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
            Best regards,<br>
            <strong>School Management System</strong>
          </p>
        </div>
        <div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p>
        </div>
      </div>
    `;

    // Email to Student
    if (student.email) {
      try {
        const studentHtml = emailTemplate
          .replace('{RECIPIENT_NAME}', student.name)
          .replace('{GREETING_TEXT}', 'Please find your attendance report below for your reference.');
        
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: student.email,
          subject: `📊 Your Attendance Report - ${student.name}`,
          html: studentHtml,
        });
        results.successful++;
        console.log('   ✅ Email sent to student:', student.name);
      } catch (error) {
        results.failed++;
        results.failedEmails.push({ 
          recipient: `${student.name} (Student)`, 
          email: student.email, 
          error: error.message 
        });
        console.log('   ❌ Failed to send to student:', student.name);
      }
    }

    // Email to Parent
    if (student.parentEmail) {
      try {
        const parentHtml = emailTemplate
          .replace('{RECIPIENT_NAME}', student.parentName || 'Parent/Guardian')
          .replace('{GREETING_TEXT}', `Please find the attendance report for your child ${student.name} below.`);
        
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: student.parentEmail,
          subject: `📊 Attendance Report for ${student.name}`,
          html: parentHtml,
        });
        results.successful++;
        console.log('   ✅ Email sent to parent of:', student.name);
      } catch (error) {
        results.failed++;
        results.failedEmails.push({ 
          recipient: `${student.parentName || 'Parent of ' + student.name}`, 
          email: student.parentEmail, 
          error: error.message 
        });
        console.log('   ❌ Failed to send to parent of:', student.name);
      }
    }

    if (results.successful === 0) {
      return res.status(400).json({
        success: false,
        message: 'No email addresses found for student or parent',
        results,
      });
    }

    console.log('✅ Student attendance report sending completed');
    console.log('   Successful:', results.successful);
    console.log('   Failed:', results.failed);

    return res.status(200).json({
      success: true,
      message: `Attendance report sent to ${results.successful} recipient(s)!`,
      results,
      stats: {
        studentName: student.name,
        rollNumber: rollNumber,
        attendancePercentage: attendancePercentage,
        present: stats.present,
        absent: stats.absent,
        apology: stats.apology,
        total: stats.total,
        period: { startDate: start.toDateString(), endDate: end.toDateString() }
      }
    });

  } catch (error) {
    console.error('❌ Student attendance report failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send attendance report: ' + error.message,
    });
  }
};

export const sendFeesReport = async (req, res) => {
  try {
    const { rollNumber, studentEmail, parentEmail } = req.body;

    if (!rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a roll number',
      });
    }

    console.log('📧 Starting fees report sending...');
    console.log('   Roll Number:', rollNumber);

    // Import StudentFees model
    const { StudentFees } = await import('../models/studentFeesSchema.js');

    // Get student fees information
    const feesData = await StudentFees.findOne({ rollNumber: rollNumber.trim() });
    
    if (!feesData) {
      return res.status(404).json({
        success: false,
        message: `No fees record found for roll number: ${rollNumber}`,
      });
    }

    // Get student details
    const student = await Student.findOne({ registrationNumber: rollNumber.trim() });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found for roll number: ${rollNumber}`,
      });
    }

    const feesInfo = {
      studentName: feesData.studentName,
      rollNumber: feesData.rollNumber,
      department: feesData.department,
      tuitionFees: feesData.tuitionFees || 0,
      hostelFees: feesData.hostelFees || 0,
      messFees: feesData.messFees || 0,
      labFees: feesData.labFees || 0,
      totalFees: feesData.totalFees || 0,
    };

    const results = {
      successful: 0,
      failed: 0,
      failedEmails: [],
    };

    const transporter = getTransporter();

    // Email to Student
    if (studentEmail && studentEmail.trim()) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: studentEmail.trim(),
          subject: `Your Student Fees Report - ${new Date().toLocaleDateString()}`,
          html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;"><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;"><h2 style="margin: 0; font-size: 24px;">📋 Student Fees Report</h2><p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Personal Statement</p></div><div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;"><p style="color: #374151; margin-top: 0; font-size: 16px;">Dear ${student.name},</p><div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;"><p style="margin: 0 0 15px 0; color: #374151;">Please find your detailed fees report below:</p><div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;"><table style="width: 100%; border-collapse: collapse;"><tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Registration No:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">${feesInfo.rollNumber}</td></tr><tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Department:</td><td style="padding: 12px 0; color: #111827; text-align: right;">${feesInfo.department}</td></tr><tr style="border-bottom: 1px solid #e5e7eb; background: #eff6ff;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Tuition Fees:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">₹${feesInfo.tuitionFees.toLocaleString('en-IN')}</td></tr><tr style="border-bottom: 1px solid #e5e7eb; background: #f0fdf4;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Hostel Fees:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">₹${feesInfo.hostelFees.toLocaleString('en-IN')}</td></tr><tr style="border-bottom: 1px solid #e5e7eb; background: #fef3c7;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Mess Fees:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">₹${feesInfo.messFees.toLocaleString('en-IN')}</td></tr><tr style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);"><td style="padding: 15px 0; color: #111827; font-weight: 700; font-size: 16px;">Total Fees:</td><td style="padding: 15px 0; color: #667eea; text-align: right; font-weight: 700; font-size: 16px;">₹${feesInfo.totalFees.toLocaleString('en-IN')}</td></tr></table></div><div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 8px; margin: 20px 0;"><p style="margin: 0; color: #1e40af; font-size: 13px;"><strong>ℹ️ Note:</strong> Please contact the administration office if you have any questions regarding your fees.</p></div></div><p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">Best regards,<br><strong>School Management System</strong></p></div><div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;"><p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p></div></div>`,
        });
        results.successful++;
        console.log('   ✅ Fees report sent to student:', student.name);
      } catch (error) {
        results.failed++;
        results.failedEmails.push({ 
          recipient: `${student.name} (Student)`, 
          email: studentEmail, 
          error: error.message 
        });
        console.log('   ❌ Failed to send to student:', student.name);
      }
    }

    // Email to Parent
    if (parentEmail && parentEmail.trim()) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: parentEmail.trim(),
          subject: `Fees Report for ${student.name} - ${new Date().toLocaleDateString()}`,
          html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;"><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;"><h2 style="margin: 0; font-size: 24px;">📋 Student Fees Report</h2><p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Parent Statement</p></div><div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;"><p style="color: #374151; margin-top: 0; font-size: 16px;">Dear ${student.parentName || 'Parent/Guardian'},</p><p style="color: #6b7280; margin-bottom: 20px;">Please find the detailed fees report for your ward ${student.name} below:</p><div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;"><div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;"><table style="width: 100%; border-collapse: collapse;"><tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Student Name:</td><td style="padding: 12px 0; color: #111827; text-align: right;">${feesInfo.studentName}</td></tr><tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Registration No:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">${feesInfo.rollNumber}</td></tr><tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Department:</td><td style="padding: 12px 0; color: #111827; text-align: right;">${feesInfo.department}</td></tr><tr style="border-bottom: 1px solid #e5e7eb; background: #eff6ff;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Tuition Fees:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">₹${feesInfo.tuitionFees.toLocaleString('en-IN')}</td></tr><tr style="border-bottom: 1px solid #e5e7eb; background: #f0fdf4;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Hostel Fees:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">₹${feesInfo.hostelFees.toLocaleString('en-IN')}</td></tr><tr style="border-bottom: 1px solid #e5e7eb; background: #fef3c7;"><td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Mess Fees:</td><td style="padding: 12px 0; color: #111827; text-align: right; font-weight: 600;">₹${feesInfo.messFees.toLocaleString('en-IN')}</td></tr><tr style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);"><td style="padding: 15px 0; color: #111827; font-weight: 700; font-size: 16px;">Total Fees:</td><td style="padding: 15px 0; color: #667eea; text-align: right; font-weight: 700; font-size: 16px;">₹${feesInfo.totalFees.toLocaleString('en-IN')}</td></tr></table></div><div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;"><p style="margin: 0; color: #92400e; font-size: 13px;"><strong>⚠️ Important:</strong> Please ensure timely payment of fees. For any queries, feel free to contact the school administration.</p></div></div><p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">Best regards,<br><strong>School Management System</strong></p></div><div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;"><p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p></div></div>`,
        });
        results.successful++;
        console.log('   ✅ Fees report sent to parent of:', student.name);
      } catch (error) {
        results.failed++;
        results.failedEmails.push({ 
          recipient: `${student.parentName || 'Parent of ' + student.name}`, 
          email: parentEmail, 
          error: error.message 
        });
        console.log('   ❌ Failed to send to parent of:', student.name);
      }
    }

    console.log('✅ Fees report sending completed');
    console.log('   Successful:', results.successful);
    console.log('   Failed:', results.failed);

    return res.status(200).json({
      success: true,
      message: `Fees report sent to ${results.successful} recipient(s)!`,
      results,
      stats: {
        studentName: student.name,
        rollNumber: rollNumber,
        totalFees: feesInfo.totalFees,
        date: new Date().toLocaleDateString(),
      }
    });

  } catch (error) {
    console.error('❌ Fees report failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send fees report: ' + error.message,
    });
  }
};
