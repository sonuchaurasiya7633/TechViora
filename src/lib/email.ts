import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const from = process.env.EMAIL_FROM || 'TechViora <noreply@techviora.com>';

  if (!host || !user || !pass) {
    console.log(`[EMAIL SIMULATION] To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

export function getEnrollmentEmailTemplate({
  studentName,
  programTitle,
  enrollmentId,
  duration,
  dashboardUrl,
}: {
  studentName: string;
  programTitle: string;
  enrollmentId: string;
  duration: string;
  dashboardUrl: string;
}) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #0f172a; padding: 28px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">TechViora</h1>
        <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 14px;">Engineering Internship & Practical Skill Development</p>
      </div>
      
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Enrollment Confirmed! 🎉</h2>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">
          Hello <strong>${studentName}</strong>,<br/>
          Welcome to TechViora. Your registration for the <strong>${programTitle}</strong> (${duration}) has been confirmed successfully.
        </p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
          <div style="font-size: 13px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Enrollment Details</div>
          <div style="margin-top: 10px; font-size: 15px; color: #0f172a;"><strong>Enrollment ID:</strong> <span style="font-family: monospace; color: #2563eb; font-weight: 700;">${enrollmentId}</span></div>
          <div style="margin-top: 6px; font-size: 14px; color: #334155;"><strong>Program:</strong> ${programTitle}</div>
          <div style="margin-top: 6px; font-size: 14px; color: #334155;"><strong>Duration:</strong> ${duration}</div>
        </div>

        <p style="color: #334155; font-size: 15px; line-height: 1.6;">
          Your learning player and daily curriculum are ready on your student dashboard. Complete lessons, practical assignments, and the capstone project to earn your verified certificate.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${dashboardUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
            Access Student Dashboard →
          </a>
        </div>
      </div>

      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 13px;">
        © 2026 TechViora. All rights reserved. For queries, contact support@techviora.com
      </div>
    </div>
  `;
}
