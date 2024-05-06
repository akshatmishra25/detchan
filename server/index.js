import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;



app.use(
  cors({
    origin: ["http://localhost:3000"], // Specify the allowed origins
    credentials: true, // Allow credentials
  })
  );
  dotenv.config();

  const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

/*app.get("/", (req, res) => {
    res.send("Hello World!");
});*/


server.listen(PORT, () => {
    connectToMongoDB();
    
    console.log(`Server running on port ${PORT}`)
    });