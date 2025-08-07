import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({
        error: "Token Invalid",
        success: false,
        status: 403,
      });
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        message: "Token Invalid",
        success: false,
        status: 403,
      });
    }
    console.log("user => ", user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};
