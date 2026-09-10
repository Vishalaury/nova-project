// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const projectRoutes = require("./routes/projectRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

// const {
//   notFound,
//   errorHandler
// } = require("./middleware/errorMiddleware");

// dotenv.config();

// connectDB();

// const app = express();

// // Middleware
// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // Health check
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "NOVA API is running "
//   });
// });

// // API routes
// app.use("/api/auth", authRoutes);

// app.use("/api/projects", projectRoutes);

// app.use("/api", taskRoutes);

// app.use("/api/dashboard", dashboardRoutes);

// // Error handling
// app.use(notFound);

// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

dotenv.config();

// =========================
// Connect MongoDB
// =========================
connectDB();

const app = express();

// =========================
// CORS
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://nova-project-git-main-vishal-mauryas-projects-dc22849f.vercel.app",
];

// Manual CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Also keep cors middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =========================
// Body Parsers
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Health Check
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NOVA API is running",
  });
});

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api", taskRoutes);

app.use("/api/dashboard", dashboardRoutes);

// =========================
// Error Handling
// =========================

app.use(notFound);

app.use(errorHandler);

// =========================
// Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});