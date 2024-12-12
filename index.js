import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import viewsRoutes from "./routes/viewsRoutes.js";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import path from "path";

dotenv.config();
connectDB();
const app = express();
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.set("views", "./views");
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/", viewsRoutes);
app.get("*", (req, res) => {
  res.status(404).send("Opps, looks like you landed on the wrong page");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server is running smoothly on PORT ${PORT}`)
);

export default app;
