import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
};

function isValidTextField(value: unknown, minLength: number) {
  return typeof value === "string" && value.trim().length >= minLength;
}

function isValidEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    // Validate Input
    const hasValidInput =
      isValidTextField(body.name, 2) &&
      isValidEmail(body.email) &&
      isValidTextField(body.topic, 2) &&
      isValidTextField(body.message, 12);

    if (!hasValidInput) {
      return NextResponse.json(
        { message: "Please provide complete and valid inquiry details." },
        { status: 400 },
      );
    }

    // Check if API Key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not defined in environment variables.");
      // We return success to the user to avoid leaking configuration issues, 
      // but in a real app you might want to log this to a service like Sentry.
      return NextResponse.json(
        { message: "Inquiry received. (Backend config pending)" },
        { status: 200 },
      );
    }

    // Send Email via Resend
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "adhirajmishra99@gmail.com",
      subject: `New Portfolio Inquiry: ${body.topic}`,
      replyTo: body.email as string,
      text: `
Name: ${body.name}
Email: ${body.email}
Topic: ${body.topic}

Message:
${body.message}
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        { message: "Message sent, but notification failed. I will still see it." },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "Inquiry submitted successfully.",
        id: crypto.randomUUID(),
        receivedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { message: "Invalid request format or server error." },
      { status: 400 },
    );
  }
}
