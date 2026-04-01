import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "jobportal",
    });
        console.log(`Connected to mongoDB database ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error);
          process.exit(1);

    }
}

export default connectDB;