import Database from "better-sqlite3";

const db = new Database("app.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) AS n FROM users").get().n;

if (count === 0) {
  const insert = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
  insert.run("Rafi", 20);
  insert.run("Nila", 21);
  insert.run("Sakib", 19);
}

export default db;