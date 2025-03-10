const express = require("express");
const path = require("path");

const connectToMongoDb = require("./connect");
connectToMongoDb("mongodb://localhost:27017/shortUrls").then(() =>
  console.log("Connected to MongoDB")
);

const urlRouter = require("./routes/url");
const Url = require("./models/url");
const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/url", urlRouter);

// app.use("/:shortId", async (req, res) => {
//   const { shortId } = req.params;

//   const entry = await Url.findOneAndUpdate(
//     { shortId },
//     { $push: { visitHistory: { timeStamp: Date.now() } } }
//   );

//   res.redirect(entry.redirectUrl);
// });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allUrls = await Url.find({});
  res.render("home", { urls: allUrls });
});

app.listen(PORT, () =>
  console.log(`Server is running on port localhost:${PORT}`)
);
