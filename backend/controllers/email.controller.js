import nodemailer from 'nodemailer';

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
    console.log('   Subject:', subject);

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
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

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check credentials.',
      });
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return res.status(500).json({
        success: false,
        message: 'Email service temporarily unavailable. Please try again.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send email: ' + error.message,
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
