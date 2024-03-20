import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js"
import cors from "cors"

//configure dotenv
dotenv.config();

//database connect
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors(
  {origin:["https://attendance-portal-d4pi.vercel.app"],
methods:["POST","GET"],
credentials:true
}
))
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth",authRoutes)

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Attendance Portal</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
