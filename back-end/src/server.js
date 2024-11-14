import express from "express";
import { cartItems, products } from "./temp-data";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello111!");
});

app.get("/products", (_, res) => {
  res.json(products);
});

app.get("/cart", (_, res) => {
  res.json(cartItems);
});

app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  res.json(products.find((product) => product.id === productId));
});

app.listen(8000, () => {
  console.log("Server is listnening on port 8000");
});
