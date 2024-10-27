// 'use server
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  const data = await request.json();
  const { to, from, subject, text, html } = data;

  // Construct the email message
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);
  console.log({ data });

  try {
    const response = await sgMail.send(msg);
    console.log({ response });
    // return response.status(200).json({
    //   message: "Email sent successfully",
    //   statusCode: response[0].statusCode,
    // });
    return Response.json({
      message: "Email sent successfully",
      statusCode: response[0].statusCode,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    // response.status(500).json({ error: 'Failed to send email', details: error.message });
    return Response.json({
      data: "Error sending email ",
    });
  }
}
