import mongoose from "mongoose";

export const db = async () => {
  try {
    console.log("MONGO_URI : =>", process.env.MONGO_URI!);
    // mongoose.connect(process.env.MONGO_URI!);
    mongoose.connect("mongodb://127.0.0.1:27017/nextAuthDB");

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
