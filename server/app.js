const express = require("express");
const cors = require("cors");

const logger = require("./middleware/loggerMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/predictions", require("./routes/predictionRoutes"));
app.use("/api/cycles", require("./routes/cycleRoutes"));
app.use("/api/symptoms", require("./routes/symptomRoutes"));
app.use("/api/medications", require("./routes/medicationRoutes"));
app.use("/api/reminders", require("./routes/reminderRoutes"));
app.use("/api/diet", require("./routes/dietRoutes"));
app.use("/api/yoga", require("./routes/yogaRoutes"));
app.use("/api/labreports", require("./routes/labReportRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Intelligent PCOS Management Platform API"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Not Found"
    });
});

app.use(errorMiddleware);

module.exports = app;