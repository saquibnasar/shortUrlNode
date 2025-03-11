const express = require("express");
const path = require("path");

const connectToMongoDb = require("./connect");
connectToMongoDb("mongodb://localhost:27017/shortUrls").then(() =>
  console.log("Connected to MongoDB")
);

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const UserRoute = require("./routes/user");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRouter);
app.use("/", staticRouter);
app.use("/user", UserRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/", async (req, res) => {
//   const allUrls = await Url.find({});
//   res.render("home", { urls: allUrls });
// });

app.listen(PORT, () =>
  console.log(`Server is running on port localhost:${PORT}`)
);
