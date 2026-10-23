import bcrypt from "bcryptjs";
import db from "../db.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "password must be at least 8 characters" });
  }

  const existing = db.prepare("SELECT id FROM accounts WHERE email = ?").get(email);
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);

  const result = db
    .prepare("INSERT INTO accounts (email, password_hash) VALUES (?, ?)")
    .run(email, hash);

  res.status(201).json({ id: result.lastInsertRowid, email });
};

async function login(req, res) {
  const { email, password } = req.body;

  const account = db.prepare("SELECT * FROM accounts WHERE email = ?").get(email);
  if (!account) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, account.password_hash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Logged in" });
}