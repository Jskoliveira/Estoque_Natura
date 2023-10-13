async function connect() {
  if (global.connection)
    return global.connection.connect();

  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
  });

  global.connection = pool;
  return pool.connect();
}
connect();

async function SelectProducts() {
  const client = await connect();
  const res = await client.query("SELECT * FROM cadastro_produto");
  return res.rows;
}

async function SelectProduct(codigo) {
  const client = await connect();
  const res = await client.query("SELECT * FROM cadastro_produto WHERE CODIGO=$1", [codigo]);
  return res.rows;
}

async function InsertProduct(product) {
  const client = await connect();
  const sql = "INSERT INTO cadastro_produto(produto,valor,codigo) VALUES ($1,$2,$3);";
  const values = [product.produto, product.valor, product.codigo]
  await client.query(sql, values);
}

async function UpDateProduct(codigo, product) {
  const client = await connect();
  const sql = "UPDATE cadastro_produto SET produto=$1, valor=$2 WHERE codigo=$3";
  const values = [product.produto, product.valor, codigo]
  await client.query(sql, values);
}

async function DeleteProduct(codigo) {
  const client = await connect();
  const sql = "DELETE FROM cadastro_produto WHERE codigo=$1";
  return await client.query(sql, [codigo]);
}

module.exports = {
  SelectProducts,
  SelectProduct,
  InsertProduct,
  UpDateProduct,
  DeleteProduct
}