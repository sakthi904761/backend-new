import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './config/.env' });

const testEmailConnection = async () => {
  try {
    console.log('\n🔍 Testing Email Configuration...\n');
    
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();
    const emailFrom = process.env.EMAIL_FROM?.trim();

    console.log('📧 Configuration:');
    console.log('   EMAIL_USER:', emailUser ? '✅ SET' : '❌ MISSING');
    console.log('   EMAIL_PASS:', emailPass ? '✅ SET (length: ' + emailPass.length + ')' : '❌ MISSING');
    console.log('   EMAIL_FROM:', emailFrom || '(using EMAIL_USER as fallback)');

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
    console.log('\n📤 Sending test email...');
    const testEmail = process.env.EMAIL_USER; // Send to self for testing
    
    const info = await transporter.sendMail({
      from: emailFrom || emailUser,
      to: testEmail,
      subject: 'Email System Test - School Management',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px; color: white;">
            <h2 style="margin: 0;">Email System Test</h2>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #374151; margin-top: 0;">Hello,</p>
            <p>This is a test email from the School Management System.</p>
            <p style="background: white; padding: 15px; border-left: 4px solid #667eea;">
              ✅ If you are seeing this email, the email system is working correctly!
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              Sent to: <strong>${testEmail}</strong><br>
              Time: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    console.log('\n✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    console.log('\n📧 Test email sent to:', testEmail);
    console.log('✅ Check your inbox or spam folder for the test email!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check EMAIL_USER and EMAIL_PASS in .env file');
    console.error('   2. Verify SMTP credentials are correct for Brevo');
    console.error('   3. Check if Brevo account is active and not suspended');
    console.error('   4. Ensure firewall allows outgoing SMTP connections on port 587');
    console.error('   5. Check email server logs for authentication failures\n');
    process.exit(1);
  }
};

testEmailConnection();
