require('dotenv').config();

const db = require("./db");
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());

const AllowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (AllowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("A origem não é um cors permitido!"));
    }
  }
}

app.options('*', cors(corsOptions));

app.get("/:id", cors(corsOptions), async (req, res) => {
  const product = await db.SelectProduct(req.params.id);
  res.json(product)
})

app.get("/", cors(corsOptions), async (_, res) => {
  const product = await db.SelectProducts();
  res.json(product)
})

app.post("/", cors(corsOptions), async (req, res) => {
  await db.InsertProduct(req.body);
  res.sendStatus(201);
})

app.patch("/:codigo", cors(corsOptions), async (req, res) => {
  await db.UpDateProduct(req.params.codigo, req.body);
  res.sendStatus(200);
})

app.delete("/:codigo", cors(corsOptions), async (req, res) => {
  await db.DeleteProduct(req.params.codigo);
  res.sendStatus(204);
})

app.listen(port)
