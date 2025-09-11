const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const pyqRoute = require("./routes/PYQ")
const {dbConnect} = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
  console.info = function () {};
  console.debug = function () {};
  console.warn = function () {};
  // You can keep console.error if you want to see errors
}

//database connect
dbConnect();
//middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
//   origin: "https://study-notion-project-27te.vercel.app",
	origin : "http://localhost:5173",
  credentials: true, // if using cookies or auth headers
}));

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/pyq", pyqRoute)

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})