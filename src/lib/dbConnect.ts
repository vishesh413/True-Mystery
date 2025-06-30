import mongoose, { ConnectionStates } from "mongoose";

type ConnectionObject = {
  isConnected?: ConnectionStates;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: "your-db-name", // optional but helpful
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("🚀 MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export default dbConnect;
