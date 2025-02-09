const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const PORT = 8000;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

// 新規ユーザー登録API
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return res.json(user);
});

app.listen(PORT, () => console.log(`サーバー起動中 Port: ${PORT}`));
