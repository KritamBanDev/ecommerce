import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const validateEmail = (email: string) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({ message: 'Name must be between 2 and 50 characters.' });
  }
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({ message: 'Message must be between 10 and 1000 characters.' });
  }

  // Check for missing environment variables
  if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASS) {
    return res.status(500).json({ message: 'Email service is not configured properly.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    // Verify transporter before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${process.env.CONTACT_EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `<h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
      replyTo: email,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    let errMsg = 'Failed to send message. Please try again later.';
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      typeof (error as { response?: unknown }).response === 'string' &&
      Boolean((error as { response?: string }).response) &&
      (error as { response?: string }).response!.includes('Invalid login')
    ) {
      errMsg = 'Email authentication failed. Please check email credentials.';
    }
    return res.status(500).json({ message: errMsg });
  }
}
