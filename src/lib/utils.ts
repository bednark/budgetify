"use server";

import mongoose from "mongoose";

const connectionString: string = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/budgetify';

const dbConnection = {
  isConnected: 0
};

const connectToDatabase = async () => {
  try {
    if (dbConnection.isConnected) {
      console.log('Using existing connection');
      return;
    }
    const db = await mongoose.connect(connectionString);
    dbConnection.isConnected = db.connections[0].readyState;
  }
  catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }
}

export default connectToDatabase;
