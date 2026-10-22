import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const logger = (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
};

app.use(express.json());
app.use(logger);

app.get("/crash", (req, res) => {
  throw new Error("boom");
});

app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(4000, (err) => {
  if (err) {
    console.error("Failed to start:", err.message);
    return;
  }
  console.log("Server running on http://localhost:4000");
});
//G:\beginner\learning-nodejs\sending-json
//Invoke-RestMethod -Method Delete -Uri http://localhost:4000/users/1