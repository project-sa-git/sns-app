const express = require("express");
const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => console.log(`サーバー起動中 Port: ${PORT}`));
