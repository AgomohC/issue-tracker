//  Require and initialize dependencies
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const trackerRoutes = require("./routes/issueTracker");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// configure rate limiter for reverse proxies
app.set("trust proxy", 1);

//configure rate limiter to allow only 100 requests from a client every 15 minutes
app.use(
  rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100,
  })
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// routes
app.get("/", (req, res) => {
  res.send(
    '<header><h1>Issues Tracker API</h1></header><h4><a href="https://github.com/AgomohC/issue-tracker#readme" target="_blank"> See Documentation <a> </h4>'
  );
});
app.use("/api", trackerRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

const connect = require("./db/connect");

//port
const port = process.env.PORT || 8080;

// database connector function
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
