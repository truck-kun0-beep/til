import express from "express";

const app = express();

const users = [
  { id: 1, name: "Rafi", age: 20 },
  { id: 2, name: "Nila", age: 21 },
  { id: 3, name: "Sakib", age: 19 },
];

app.get("/users/:id", (req, res) => {
  
  const id = Number(req.params.id);
  
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.get("/users", (req, res) => {
  const minAge = Number(req.query.minAge);
  console.log("query route hit:", req.query);
  if (minAge) {
    return res.json(users.filter((u) => u.age >= minAge));
  }

  res.json(users);
});

/*app.get("/users/:id/name", (req, res) => {

  const name = req.params.name;

  const user = users.find((u) => u.name === name);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});*/
app.get("/users/:id/name", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ name: user.name });
});


app.post("/users", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "name and age are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});