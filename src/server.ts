import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("oi");
});

app.post("/courses", (req, res) => {
  const { body } = req;
  return res.json(body);
});

app.listen(3333, () => console.log("Server is running!"));
