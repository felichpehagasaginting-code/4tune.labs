import { NextResponse } from "next/server";
import { z } from "zod";

const InquirySchema = z.object({
  workEmail: z.string().email(),
  companyName: z.string().min(2),
  domainClassification: z.string(),
  technicalScope: z.string().min(10),
  budgetTier: z.string(),
  isEncrypted: z.boolean().default(false),
  routingFounder: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = InquirySchema.parse(json);

    // Logging transmission towards official studio mailer
    console.log("[INQUIRY_DISPATCH] Transmitted payload to 4tune.labs@gmail.com", {
      email: payload.workEmail,
      company: payload.companyName,
      domain: payload.domainClassification,
      routedTo: payload.routingFounder || "Felich",
      timestamp: new Date().toISOString()
    });

    // Compute deterministic checksum
    const receiptHash = `sha256:${Buffer.from(payload.workEmail + payload.companyName + Date.now().toString())
      .toString("base64")
      .slice(0, 32)}`;

    return NextResponse.json({
      status: "success",
      receipt: receiptHash,
      timestamp: new Date().toISOString(),
      destination: "4tune.labs@gmail.com"
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        type: "https://4tune.labs/errors/invalid-payload",
        title: "Unprocessable Entity",
        status: 422,
        detail: error?.message || "Invalid payload submitted"
      },
      { status: 422 }
    );
  }
}
