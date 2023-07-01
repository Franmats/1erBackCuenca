import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();

const manager = new ProductManager("BD.json");

manager.addProduct("producto prueba 1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 23);
let productos = await manager.getProducts()
console.log(productos)
/* try {
    
    manager.addProduct("producto prueba 2", "Este es un producto prueba", 200, "Sin imagen", "abc466", 24);
    
}catch(e) {
    console.log(e)
} */
app.get("/api/products", (request, response) => {
  let limit = request.query.limit;
  console.log(limit);
  if (limit) {
    limit = limit.toLocaleLowerCase();
    const ProdFilter = productos.filter(e => e.id <= limit);
    return response.send(ProdFilter);
  }
});

/* app.listen(8080, () => console.log("Running on 8080...")) */