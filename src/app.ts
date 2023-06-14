import express from "express";
import cors from "cors";
import expressWinston from "express-winston";
import winston from "winston";

// Credibility Calculator
import errorHandler from "./errorHandling/errorHandler";
import calculatorRoutes from "./calculator/routes";

// DB
import config from "./config";
import { router } from "./db/routes";

// Create Express server
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

/* istanbul ignore next */
if (config.NODE_ENV !== "test") {
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      meta: false,
      msg: "HTTP {{req.method}} {{req.url}}",
      colorize: true,
    })
  );
}

app.use("/health", (req, res) => {
  console.log("health check");
  res.json({ status: "UP" });
});

app.use("/calculate", calculatorRoutes);
app.use(errorHandler);

export default app;
