import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const response = NextResponse.json({
      message: "User Logout",
      success: true,
      status: 203,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
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
