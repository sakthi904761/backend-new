import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './config/.env' });

const sendTestEmail = async () => {
  try {
    console.log('\n🔍 Sending Test Email to Gmail...\n');
    
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();
    const emailFrom = process.env.EMAIL_FROM?.trim();
    const testRecipient = 'malathisakthi00@gmail.com';

    console.log('📧 Configuration:');
    console.log('   From:', emailFrom || emailUser);
    console.log('   To:', testRecipient);
    console.log('   SMTP Host: smtp-relay.brevo.com:587');

    if (!emailUser || !emailPass) {
      throw new Error('Missing email credentials in .env file');
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
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

    console.log('\n✅ Transporter created\n');

    // Verify connection
    console.log('🔗 Verifying SMTP connection...');
    const verified = await transporter.verify();
    console.log('✅ SMTP connection verified:', verified);

    // Send test email
    console.log('\n📤 Sending test email to:', testRecipient);
    
    const info = await transporter.sendMail({
      from: emailFrom || emailUser,
      to: testRecipient,
      subject: '🧪 School Management System - Email Test',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0; font-size: 24px;">School Management System</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Email System Test</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #374151; margin-top: 0; font-size: 16px;">Hello,</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <p style="margin: 0; color: #065f46; font-weight: 600;">✅ Email System is Working!</p>
              <p style="margin: 10px 0 0 0; color: #047857;">This test email confirms that the School Management System email delivery is functioning correctly.</p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 13px; color: #6b7280;">
              <p style="margin: 0 0 10px 0;"><strong>Test Details:</strong></p>
              <p style="margin: 5px 0;">📧 Recipient: <strong>${testRecipient}</strong></p>
              <p style="margin: 5px 0;">🔐 From: <strong>${emailFrom || emailUser}</strong></p>
              <p style="margin: 5px 0;">⏰ Sent: <strong>${new Date().toLocaleString()}</strong></p>
              <p style="margin: 5px 0;">🖥️ Server: <strong>smtp-relay.brevo.com:587</strong></p>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
              If you received this email, your account is set up correctly and ready to send communications to students and parents.
            </p>
          </div>
          <div style="background: #1f3a57; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 School Management System. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log('\n✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response Status:', info.response);
    console.log('\n📧 Email Details:');
    console.log('   To:', testRecipient);
    console.log('   From:', emailFrom || emailUser);
    console.log('   Subject: 🧪 School Management System - Email Test');
    console.log('\n⏳ Checking inbox/spam folder in 10 seconds...');
    console.log('✅ If email arrives, system is working correctly!\n');

  } catch (error) {
    console.error('\n❌ Error sending email:', error.message);
    console.error('\nFull Error Details:');
    console.error(error);
    console.error('\n🔧 Troubleshooting Steps:');
    console.error('   1. Check .env file for correct EMAIL_USER and EMAIL_PASS');
    console.error('   2. Verify Brevo account credentials are correct');
    console.error('   3. Check if SMTP relay is enabled in Brevo');
    console.error('   4. Ensure no firewall is blocking port 587');
    console.error('   5. Verify EMAIL_FROM is a valid email address\n');
    process.exit(1);
  }
};

sendTestEmail();
