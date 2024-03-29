import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { connectDB } from "./data/data.js";
import auth from "./routes/auth.js";
import commetRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

export const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
// CORS
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
config({
  path: ".env",
});

const __dirname = path.resolve();

app.use("/images", express.static(path.join(__dirname, "images")));

connectDB();

app.use("/api/auth", auth);
app.use("/api/user", userRoutes);
app.use("/api/comment", commetRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});
