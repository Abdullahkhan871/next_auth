import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

interface mailerValue {
  email: string;
  emailType: string;
  userId: string;
}

export const mailer = async ({ email, emailType, userId }: mailerValue) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    console.log(emailType === "VERIFY");
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "f30143fa14feca",
        pass: "e71a33a2050f1d",
      },
    });

    const mailOption = {
      from: "maddison53@ethereal.email",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: `<div>
      <p>
        ${
          emailType === "VERIFY"
            ? "Click to verify your email"
            : "Click to reset your Password"
        }
        </p>
        <a href="${process.env.DOMAIN}/api/user/${
        emailType === "VERIFY" ? "verify-email" : "reset-password"
      }?token=${hashedToken}" style="padding:15px; background-color: red;">Click Here</a>
      <p>${hashedToken}</p>
      </div>`,
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error) {}
};
