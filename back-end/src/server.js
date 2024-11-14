import express from "express";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello!");
});

app.listen(8000, () => {
  console.log("Server is listnening on port 8000");
});
