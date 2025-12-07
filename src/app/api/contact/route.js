import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Configure Gmail transporter securely
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lomash265@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // your app password
      },
      tls: {
        rejectUnauthorized: false, // ✅ Fix for "self-signed certificate in certificate chain"
      },
    });

    // 1️⃣ Send message to Digimart inbox
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "lomash265@gmail.com",
      subject: `Contact Form: ${subject}`,
      text: `From: ${name} (${email})\n ${phone}\n${message}`,
    });

    // 2️⃣ Send confirmation email to the user
    await transporter.sendMail({
      from: "lomash265@gmail.com",
      to: email,
      subject: "We've received your message - DigiMart Support",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f8f9fa;border-radius:10px">
          <h2>Hi ${name},</h2>
          <p>Thanks for reaching out to Lomash Jangde. Your query has been received successfully.</p>
          <p>I'll will get back to you soon regarding: <b>${subject}</b></p>
          <hr/>
          <p>Best regards,<br/>Lomash Jangde</p>
          <a href="https://portfolio-sandy-eta-40.vercel.app/" 
             style="display:inline-block;margin-top:10px;padding:10px 20px;background:#3B82F6;color:#fff;text-decoration:none;border-radius:8px">
             Visit Website
          </a>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
