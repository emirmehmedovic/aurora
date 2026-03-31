import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/security";

const MIN_FORM_FILL_MS = 1000;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(5).max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`contact:${ip}`, 8, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Previše zahtjeva. Pokušajte ponovo kasnije." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Neispravni podaci forme" }, { status: 400 });
    }

    const { name, email, phone, subject, message, website, formStartedAt } = parsed.data;

    if (website) {
      return NextResponse.json({ success: true, message: "Poruka uspješno poslata" });
    }

    if (!formStartedAt || Date.now() - formStartedAt < MIN_FORM_FILL_MS) {
      return NextResponse.json(
        { error: "Forma je poslana prebrzo. Pokušajte ponovo." },
        { status: 400 }
      );
    }

    // TODO: Save to database or send email notification to admin
    // TODO: Send auto-reply to customer

    return NextResponse.json({
      success: true,
      message: "Poruka uspješno poslata"
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
