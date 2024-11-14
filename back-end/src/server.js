import express from "express";
import { cartItems, products } from "./temp-data";

const app = express();
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello!");
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

app.post("/cart", (req, res) => {
  const productId = String(req.body.id);
  const product = products.find((product) => product.id === productId);
  cartItems.push(product);
  res.json(cartItems);
});

app.listen(8000, () => {
  console.log("Server is listnening on port 8000");
});
