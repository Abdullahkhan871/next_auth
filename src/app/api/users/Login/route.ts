import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "@/db/db";
db();
export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "Invalid credentials",
        success: false,
        status: 400,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Invalid credentials",
        success: false,
        status: 400,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User Logged In",
      success: true,
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};
