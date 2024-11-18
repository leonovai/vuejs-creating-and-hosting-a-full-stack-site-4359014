import express from 'express';
import { MongoClient } from 'mongodb';
import { cartItems as cartItemsRaw, products as productsRaw } from './temp-data';

let cartItems = cartItemsRaw;
let products = productsRaw;

async function start() {

  const dbUrl = 'mongodb+srv://newuser:IuiQpO0uboSoE4Pe@mycluster.pezg5.mongodb.net/'
  const client = new MongoClient(dbUrl, {
    tls: true,
    tlsCAFile: '/etc/ssl/certs/CatoNetworksTrustedRootCA.pem'
  })

  await client.connect();
  const db = client.db('vue-db');

  const app = express();
  app.use(express.json());

  app.get('/products', async (_, res) => {
    products = await db.collection('products').find({}).toArray();
    res.json(products);
  });

  async function populateCartIds(ids) {
    return Promise.all(
      ids.map(id => db.collection('products').findOne({ id }))
    );
    // return ids.map(id => products.find(product => product.id === id));
  }

  app.get('/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const user = await db.collection('users').findOne({ id: userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection('products').findOne({ id: productId });
    res.json(product);
  });

  app.post('/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    // cartItems.push(productId);
    await db.collection('users').updateOne(
      { id: userId },
      { $addToSet: { cartItems: productId } }
    );


    const user = await db.collection('users').findOne({ id: userId });
    console.log(user);

    const populatedCart = await populateCartIds(user.cartItems);
    
    res.json(populatedCart);
  });

  app.delete("/cart/:productId", (req, res) => {
    const productId = req.params.productId;
    const index = cartItems.findIndex(product => product.id === productId);

    if (index !== -1) {
      cartItems.splice(index, 1);
    }

    console.log(cartItems);
    res.json(cartItems);
  });

  app.listen(8000, () => {
    console.log('Server is listening on port 8000')
  });
}

start();
