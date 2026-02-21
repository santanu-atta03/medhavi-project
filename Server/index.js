const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

// ✅ CORS must be set up FIRST — before routes and DB connect
const allowedOrigins = [
	"https://medhavi-pro.vercel.app",
	"http://localhost:3000",
	"http://localhost:5173",
];

if (process.env.FRONTEND_URL) {
	allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
	origin: function (origin, callback) {
		// Allow requests with no origin (mobile apps, curl, Postman)
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error("CORS not allowed for: " + origin), false);
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

// Handle preflight OPTIONS requests for ALL routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// File upload
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
);

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const pyqRoute = require("./routes/PYQ");
const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// DB + Cloudinary connect
dbConnect();
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/pyq", pyqRoute);

// Health check
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running....",
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
});
