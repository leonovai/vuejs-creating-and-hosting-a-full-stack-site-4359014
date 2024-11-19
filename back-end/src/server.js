import express from "express";
import { MongoClient } from "mongodb";

async function start() {
  const dbUrl =
    "mongodb+srv://newuser:IuiQpO0uboSoE4Pe@mycluster.pezg5.mongodb.net/";
  const client = new MongoClient(dbUrl, {
    tls: true,
    tlsCAFile: "/etc/ssl/certs/CatoNetworksTrustedRootCA.pem",
  });

  await client.connect();
  const db = client.db("vue-db");

  const app = express();
  app.use(express.json());

  app.get("/products", async (_, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  });

  async function populateCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
    // return ids.map(id => products.find(product => product.id === id));
  }

  app.get("/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  app.post("/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    // cartItems.push(productId);
    await db
      .collection("users")
      .updateOne({ id: userId }, { $addToSet: { cartItems: productId } });

    const user = await db.collection("users").findOne({ id: userId });

    const populatedCart = await populateCartIds(user.cartItems);

    res.json(populatedCart);
  });

  app.delete("/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db
      .collection("users")
      .updateOne({ id: userId }, { $pull: { cartItems: productId } });

    const user = await db.collection("users").findOne({ id: userId });

    const populatedCart = await populateCartIds(user.cartItems);

    res.json(populatedCart);
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

start();
