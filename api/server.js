const express = require("express");

const app = express();

const authRouter = require("./routers/auth");

require("dotenv").config();

const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Top</h1>");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`サーバー起動中 Port: ${PORT}`));
