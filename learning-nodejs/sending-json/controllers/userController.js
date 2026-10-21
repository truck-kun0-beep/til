const users = [
  { id: 1, name: "Rafi", age: 20 },
  { id: 2, name: "Nila", age: 21 },
  { id: 3, name: "Sakib", age: 19 },
];

let nextId = 4;

export const getUsers = (req, res) => {
  const minAge = Number(req.query.minAge);

  if (minAge) {
    return res.json(users.filter((u) => u.age >= minAge));
  }

  res.json(users);
};

export const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const getUserName = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

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

  const newUser = { id: nextId++, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
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
};

export const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.status(204).send();
};