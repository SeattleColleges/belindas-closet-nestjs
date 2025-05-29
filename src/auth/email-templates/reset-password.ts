const getResetPasswordEmailTemplate = (firstName: string, resetUrl: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
        border-bottom: 3px solid #0066cc;
      }
      .content {
        padding: 20px;
        background-color: #ffffff;
      }
      .footer {
        margin-top: 20px;
        padding: 20px;
        font-size: 12px;
        text-align: center;
        color: #666666;
        background-color: #f8f9fa;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #0066cc;
        color: #ffffff !important;
        text-decoration: none;
        font-weight: bold;
        border-radius: 4px;
        margin: 20px 0;
      }
      .warning {
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
        padding: 12px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Password Reset Request</h2>
      </div>
      <div class="content">
        <p>Hello${firstName ? ' ' + firstName : ''},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        
        <div class="warning">
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        
        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
        <p style="word-break: break-all;">${resetUrl}</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  </body>
  </html>
    `;
};

export default getResetPasswordEmailTemplate;
