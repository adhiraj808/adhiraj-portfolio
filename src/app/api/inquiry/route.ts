import { NextResponse } from "next/server";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  interest?: unknown;
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

    // Keep API validation lightweight but strict enough for production ingestion.
    const hasValidInput =
      isValidTextField(body.name, 2) &&
      isValidEmail(body.email) &&
      isValidTextField(body.company, 2) &&
      isValidTextField(body.interest, 3) &&
      isValidTextField(body.message, 12);

    if (!hasValidInput) {
      return NextResponse.json(
        { message: "Please provide complete and valid inquiry details." },
        { status: 400 },
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
  } catch {
    return NextResponse.json(
      { message: "Invalid request format. Expected JSON payload." },
      { status: 400 },
    );
  }
}
