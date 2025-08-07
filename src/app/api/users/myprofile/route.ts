import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { User } from "@/models/userModel";
import { db } from "@/db/db";
db();
export const POST = async (req: NextRequest) => {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({
        message: "Unauthorized user",
        success: false,
        status: 400,
      });
    }

    const user = User.findById({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User Profile found",
      success: true,
      status: 203,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};
