import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

const logger = (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
};

app.get("/crash", (req, res) => {
  throw new Error("boom");
});


app.use(logger);
app.use("/users", userRoutes);



app.listen(4000, (err) => {
  if (err) {
    console.error("Failed to start:", err.message);
    return;
  }
  console.log("Server running on http://localhost:4000");
});
//G:\beginner\learning-nodejs\sending-json
