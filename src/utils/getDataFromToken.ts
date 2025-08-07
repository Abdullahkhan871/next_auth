import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Unauthorized user");
    }
    const userId = jwt.sign(token, process.env.TOKEN_SECRET!);

    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
