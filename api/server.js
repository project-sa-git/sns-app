const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

// ユーザーログインAPI
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "ユーザーが見つかりません。" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "パスワードが間違っています。" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json(token);
});

app.listen(PORT, () => console.log(`サーバー起動中 Port: ${PORT}`));
