const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const allowedOrigins = [
	"https://medhavi-pro.vercel.app",
	"http://localhost:3000",
	"http://localhost:5173",
];

const corsOptions = {
	origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps or curl)
		if (!origin) return callback(null, true);

		// Check if origin is in our allowed list
		if (allowedOrigins.indexOf(origin) !== -1 || origin.includes("vercel.app")) {
			callback(null, true);
		} else {
			console.log("CORS Blocked for origin:", origin);
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
	credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight for all routes
app.options("*", cors(corsOptions));

// Logging middleware for Render
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
	next();
});

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
