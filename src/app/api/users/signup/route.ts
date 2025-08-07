import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";
import { mailer } from "@/utils/mailer";
db();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "user already exist", status: 400 });
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const sendMailResponse = await mailer({
      email,
      emailType: "VERIFY",
      userId: newUser._id,
    });

    console.log("sendMailResponse", sendMailResponse);

    return NextResponse.json({
      message: "User registered",
      success: true,
      user: newUser,
      status: 200,
    });
  } catch (error: any) {
    // console.log(error.message);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
