//import 'dotenv/config';
//import { GoogleGenerativeAI } from "@google/generative-ai";

//const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//const model = genAI.getGenerativeModel({
  //model: "gemini-2.5-flash",
//});

//const result = await model.generateContent(
  //"provide full form of html,css,js"
//);

//const response = result.response.text();

//console.log(response);

     import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";  // ← add this

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gemnova-frontend.onrender.com"
  ]
}));

app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);  // ← add this

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};

app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
  await connectDB();
});