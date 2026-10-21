import express from "express";


let nextId = 4; // set to (highest existing id) + 1

const app = express();
app.use(express.json());


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
  id: nextId++,
  name,
  age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "name and age are required" });
  }

  user.name = name;
  user.age = age;

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.status(204).send();
});
app.listen(4000, (err) => {
  if (err) {
    console.error("Failed to start:", err.message);
    return;
  }
  console.log("Server running on http://localhost:4000");
});

//G:\beginner\learning-nodejs\sending-json
