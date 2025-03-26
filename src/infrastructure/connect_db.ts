import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI!, {
      connectTimeoutMS: 30000,
    });
    return true;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
