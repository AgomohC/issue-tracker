require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const trackerRoutes = require("./routes/issueTracker");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use("/api", trackerRoutes);
app.use(notFound);
app.use(errorHandler);
const connect = require("./db/connect");
const port = process.env.PORT || 8080;
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
