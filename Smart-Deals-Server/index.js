const express = require("express");
const cors = require("cors");

require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

console.log(process.env);


// Middleware
app.use(cors());
app.use(express.json());

// smartDB
// 6tAS3hfVKTU2rF1c

// const uri =
//   "mongodb+srv://smartDB:6tAS3hfVKTU2rF1c@crud-project.eyn7az2.mongodb.net/?appName=CRUD-PROJECT";
const uri =
  `mongodb+srv://${process.env.SMARTDB_USER}:${process.env.SMARTDB_PASS}@crud-project.eyn7az2.mongodb.net/?appName=CRUD-PROJECT`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Smart server is running");
});

async function run() {
  try {
    await client.connect();

    const smartUsersDB = client.db("smart_db");
    const productsCollection = smartUsersDB.collection("products");
    const bidsCollection = smartUsersDB.collection("Bids");
    const usersCollection = smartUsersDB.collection("users");

    //Users API
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("new user", newUser);
      const email = req.body.email;
      const query = { email: email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        res.send({ massage: "already user exist . please use another email" });
      } else {
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
      }
    });

    //Products APIs
    app.get("/products", async (req, res) => {
      const productsFields = { title: 1, price_min: 1, price_max: 1 };
      // const cursor = productsCollection
      //   .find()
      //   .sort({ price_min: 1 })
      //   .skip(3)
      //   .limit(5)
      //   .project(productsFields);

      console.log(req.query);
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/latest/products", async (req, res) => {
      const cursor = productsCollection
        .find()
        .sort({
          created_at: -1,
        })
        .limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateProduct = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateProduct.name,
          price: updateProduct.price,
        },
      };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    //bids relatred apis

    app.get("/Bids", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products/Bids/:productId", async (req, res) => {
      const productId = req.params.productId;
      const query = { product: productId };
      const cusor = bidsCollection.find(query).sort({ bid_price: -1 });
      const result = await cusor.toArray();
      res.send(result);
    });

    app.get("/Bids", async (req, res) => {
      const query = {};
      if (query.email) {
        query.buyer_email = email;
      }
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/Bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid);
      res.send(result);
    });

    app.delete("/Bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/Bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`smart server in running on port : ${port}`);
});
