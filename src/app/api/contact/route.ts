import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message, honeypot } = body;

    // 1. Anti-Spam: Honeypot check
    if (honeypot) {
      return NextResponse.json({ message: "Spam detected." }, { status: 400 });
    }

    // 2. Validation
    if (!name || !email || !topic || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    // 3. Setup Nodemailer Transporter
    // You need to use your Gmail and an "App Password"
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Email Options
    const mailOptions = {
      from: email, // This might be overwritten by Gmail to your own email for security
      to: "adhirajmishra99@gmail.com",
      subject: `Portfolio: ${topic}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
      replyTo: email,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Your message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
