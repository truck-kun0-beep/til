import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from my server!");
});
app.get("/about", (req, res) => {
  res.send("This is the about page");
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
