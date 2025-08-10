import mongoose from "mongoose";

export const db = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connection");
    });
    connection.off("error", (error) => {
      console.log("MongoDB error: " + error);
      process.exit();
    });
  } catch (error) {
    console.log("Went wrong in DB db.ts");
  }
};
