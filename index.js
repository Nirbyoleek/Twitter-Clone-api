import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();

const connect = () => {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(process.env.MONGO)
		.then(() => {
			console.log("connect to mongodb database");
		})
		.catch((err) => {
			throw err;
		});
};

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	connect();
	console.log(`Server is running on port ${PORT}`);
});
