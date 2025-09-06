import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  console.log('Creating email transporter...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
  
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured. Email sending will be disabled.');
    console.warn('Please set EMAIL_USER and EMAIL_PASS in .env file');
    return null;
  }

  try {
    console.log('Creating nodemailer transporter with Gmail...');
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Transporter created, verifying connection...');
    
    // Verify connection configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('Email transporter verification failed:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          response: error.response
        });
      } else {
        console.log('✅ Email transporter is ready to send messages');
      }
    });

    return transporter;
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
};

// Send OTP email
export const sendOTPEmail = async (email, otp, type = 'verification') => {
  try {
    console.log(`Attempting to send ${type} email to: ${email}`);
    
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log(`Email service not configured. OTP for ${email}: ${otp}`);
      return { success: true, messageId: 'email-disabled' };
    }
    
    const subject = type === 'verification' 
      ? 'Verify your SynergySphere account' 
      : 'Reset your SynergySphere password';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5; margin: 0;">SynergySphere</h1>
          <p style="color: #6B7280; margin: 5px 0 0 0;">Collaborate. Innovate. Succeed.</p>
        </div>
        
        <div style="background: #F9FAFB; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1F2937; margin: 0 0 20px 0; text-align: center;">
            ${type === 'verification' ? 'Verify Your Email Address' : 'Reset Your Password'}
          </h2>
          
          <p style="color: #4B5563; margin: 0 0 20px 0; line-height: 1.6;">
            ${type === 'verification' 
              ? 'Thank you for signing up with SynergySphere! To complete your registration, please verify your email address using the OTP below:'
              : 'You requested to reset your password. Use the OTP below to create a new password:'
            }
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: #4F46E5; color: white; padding: 15px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #6B7280; margin: 20px 0 0 0; font-size: 14px; text-align: center;">
            This OTP will expire in 5 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; color: #9CA3AF; font-size: 12px;">
          <p>© 2025 SynergySphere. All rights reserved.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'SynergySphere <noreply@synergysphere.com>',
      to: email,
      subject,
      html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', result.messageId);
    console.log('Email response:', result.response);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response
    });
    return { success: false, error: error.message };
  }
};

// Test email function
export const testEmail = async () => {
  try {
    console.log('Testing email service...');
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('❌ Email service not configured');
      return { success: false, message: 'Email service not configured' };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'SynergySphere <noreply@synergysphere.com>',
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'SynergySphere Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Email Test Successful!</h1>
          <p>If you receive this email, your email service is working correctly.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, firstName) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log(`Email service not configured. Welcome email for ${email} skipped.`);
      return { success: true, messageId: 'email-disabled' };
    }
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5; margin: 0;">SynergySphere</h1>
          <p style="color: #6B7280; margin: 5px 0 0 0;">Collaborate. Innovate. Succeed.</p>
        </div>
        
        <div style="background: #F9FAFB; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1F2937; margin: 0 0 20px 0; text-align: center;">
            Welcome to SynergySphere, ${firstName}!
          </h2>
          
          <p style="color: #4B5563; margin: 0 0 20px 0; line-height: 1.6;">
            Your account has been successfully created and verified. You're now ready to start collaborating with your team and unlock the full potential of SynergySphere.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              Get Started
            </a>
          </div>
        </div>
        
        <div style="text-align: center; color: #9CA3AF; font-size: 12px;">
          <p>© 2025 SynergySphere. All rights reserved.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'SynergySphere <noreply@synergysphere.com>',
      to: email,
      subject: 'Welcome to SynergySphere!',
      html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};
