// IMPORT PACKAGE
import express from "express";
import morgan from "morgan";
import moviesRouter from "./routes/moviesRoutes.mjs";
import authRouter from "./routes/authRouter.mjs"; // Correct import of authRouter

import CustomError from "./utils/CustomError.mjs";
import globalErrorHandler from "./controllers/errorController.mjs";

const app = express();

app.use(express.json());

// Static files middleware
app.use(express.static("./public"));

// Using routes
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/users", authRouter); // Use authRouter here for user routes

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

// Global error handler
app.use(globalErrorHandler);

export default app;
