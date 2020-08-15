require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");

// const { cloudinaryConfig } = require("./config/cloudinaryConfig");

const { HOST, mongoURI } = config;
// console.log(mongoURI);

const mongoose = require("mongoose");

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const app = express();
// app.use("*", cloudinaryConfig);

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(`build`));
app.get(`/admin`, (req, res) => {
    res.sendFile(path.resolve(__dirname, `build`, `index.html`));
});

app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "public")));
const apiRouter = require("./src/routes/api");
app.use("/api/v1", apiRouter);
app.listen(HOST, () => console.log("server started"));
