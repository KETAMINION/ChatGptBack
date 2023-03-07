const express = require("express");
const app = express();
const cors = require("cors");

const twitterRouter = require("./routes/twitterRouter");
const chatGptRouter = require("./routes/chatGptRouter")

app.use(express.json());
app.use(cors({ origin: true })); // enable origin cors
app.all(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept", "*");
  next();
});

app.use("/", twitterRouter);
app.use("/", chatGptRouter);


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening on port ${port}`));
