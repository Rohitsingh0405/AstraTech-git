const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { json } = require('stream/consumers');
const { json } = require("stream/consumers");
const prisma = require("./prismaSetup");
const app = express();
app.use(express.json());

require("dotenv").config();
const user = [];

const date = new Date();
const hour = date.getHours();
const min = date.getMinutes();

const ti = `${hour}:${min}`;
const createDatabase = () => {
  fs.writeFileSync("dataBase.json", JSON.stringify(user));
};
const space = "\n";
const space1 = "\t";
const createUserDatabase = (usr, data) => {
  console.log({ user: usr });
  console.log({ datas: data });
  fs.writeFileSync(`${usr}.txt`, data + space1 + ti + space);
  // fs.appendFileSync(`${usr}.txt `,space)

  // fs.appendFileSync(`${usr}.txt`,ti)
};
// const tokenVerify = (req,res)=>{

//     return verified

// }

// Authentication Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ Message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ Message: "Invalid token" });
    }
    res.status(500).json({ Message: "Authentication error" });
  }
};

app.get("/getuser", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ Message: "Unauthorized: Admin access required" });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ Message: "Error fetching users" });
  }
});

app.post("/Signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashpass = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ Message: "User already exists" });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        id: Math.random().toString(36).substring(7), // Generate a random ID
        name: username,
        email,
        password: hashpass,
      },
    });

    res.status(201).json({
      Message: "You are now Signed Up",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ Message: "Error during signup" });
  }
});
app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ Message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ Message: "Error during login" });
  }
});
app.get("/Access", authenticateToken, (req, res) => {
  res.json("hi");
});
app.post("/addTodo", authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;

    const todo = await prisma.todo.create({
      data: {
        id: Math.random().toString(36).substring(7),
        title,
        userId: req.user.userId,
      },
    });

    res.status(201).json({ Message: "Todo added successfully", todo });
  } catch (error) {
    console.error("Add todo error:", error);
    res.status(500).json({ Message: "Error adding todo" });
  }
});
app.get("/seeTodo", authenticateToken, async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ todos });
  } catch (error) {
    console.error("Get todos error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ Message: "Invalid token" });
    }
    res.status(500).json({ Message: "Error fetching todos" });
  }
});

app.post("/deleteTodo", authenticateToken, async (req, res) => {
  try {
    const { todoId } = req.body;

    // Verify that the todo belongs to the user
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        userId: req.user.userId,
      },
    });

    if (!todo) {
      return res
        .status(404)
        .json({ Message: "Todo not found or unauthorized" });
    }

    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    res.status(200).json({ Message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ Message: "Error deleting todo" });
  }
});
app.post("/admin", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ Message: "Unauthorized: Admin access required" });
    }

    const { userId } = req.body;

    // Delete all todos for the specified user
    await prisma.todo.deleteMany({
      where: {
        userId: userId,
      },
    });

    // Delete the user
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res
      .status(200)
      .json({ Message: "User and their todos deleted successfully" });
  } catch (error) {
    console.error("Admin operation error:", error);
    res.status(500).json({ Message: "Error performing admin operation" });
  }
});

app.listen(8080, () => {
  if (!fs.existsSync("dataBase.json")) {
    createDatabase();
  }
  console.log("Server started on port 8080 - http://localhost:8080");
});

// Just for the commit
// console.log("Error log")
