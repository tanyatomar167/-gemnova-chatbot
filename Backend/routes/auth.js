import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ── REGISTER ──────────────────────────────────────────
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // STEP 1 — validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    // STEP 2 — check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // STEP 3 — hash the password
    // 10 = salt rounds (how strong the hash is)
    const hashed = await bcrypt.hash(password, 10);

    // STEP 4 — save user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashed  // save hash, not plain password
    });

    // STEP 5 — create JWT token
    const token = jwt.sign(
      { userId: user._id },      // payload — what to store in token
      process.env.JWT_SECRET,    // secret key to sign token
      { expiresIn: "7d" }        // token expires in 7 days
    );

    // STEP 6 — send token to frontend
    res.json({
      token,
      user: { name: user.name, email: user.email }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ── LOGIN ─────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    // STEP 1 — find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // STEP 2 — compare entered password with hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
      // NOTE: same error for both wrong email and wrong password
      // this is intentional — don't tell hacker which one is wrong
    }

    // STEP 3 — create new token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // STEP 4 — send token
    res.json({
      token,
      user: { name: user.name, email: user.email }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;

/*
EXPLANATION:
→ Register hashes password then saves user
→ Login finds user, compares password, creates token
→ Token contains userId so backend knows who is making request
→ Frontend saves this token and sends it with every future request
*/