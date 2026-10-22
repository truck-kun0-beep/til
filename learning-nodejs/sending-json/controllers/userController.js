import db from "../db.js";

export const getUsers = (req, res) => {
  const minAge = Number(req.query.minAge);

  if (minAge) {
    const rows = db.prepare("SELECT * FROM users WHERE age >= ?").all(minAge);
    return res.json(rows);
  }

  res.json(db.prepare("SELECT * FROM users").all());
};

export const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const getUserName = (req, res) => {
  const id = Number(req.params.id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);



  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ name: user.name });
};

export const createUser = (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "name and age are required" });
  }

  const result = db
    .prepare("INSERT INTO users (name, age) VALUES (?, ?)")
    .run(name, age);

  res.status(201).json({ id: result.lastInsertRowid, name, age });
};

export const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "name and age are required" });
  }

  db.prepare("UPDATE users SET name = ?, age = ? WHERE id = ?").run(name, age, id);
  res.json({ id, name, age });
};

export const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  db.prepare("DELETE FROM users WHERE id = ?").run(id);
  res.status(204).send();
};