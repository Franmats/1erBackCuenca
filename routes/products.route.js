import {ProductManager} from "../ProductManager.js"
import { Router } from "express";
const router = Router()

const manager = new ProductManager("BD.json");

    manager.addProduct("producto prueba 1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 23);
    manager.addProduct("producto prueba 2", "Este es un producto prueba", 200, "Sin imagen", "abc1231", 23);
    manager.addProduct("producto prueba 3", "Este es un producto prueba", 200, "Sin imagen", "abc122", 23);
    manager.addProduct("producto prueba 4", "Este es un producto prueba", 200, "Sin imagen", "abc125", 23);
    manager.addProduct("producto prueba 5", "Este es un producto prueba", 200, "Sin imagen", "abc124", 23);
    manager.addProduct("producto prueba 6", "Este es un producto prueba", 200, "Sin imagen", "abc121", 23);
    let productos = await manager.getProducts()


  //MOSTRAR LISTA DE PRODUCTOS TOTALES FUNCIONA!!
router.get("/",async (request, response) => {
    response.send(await manager.getProducts())
  })
  // MOSTRAR PRODUCTOS SEGUN QUERY FUNCIONA !!
router.get("/", (request, response) => {
    let limit = request.query.limit //escribir en el navegador ?limit=2
    console.log(limit)
    if (limit) {
        limit = limit.toLocaleLowerCase()
        const ProdFilter = productos.filter(e => e.id <= limit)
        return response.send(ProdFilter)
    }
  })

  //MOSTRAR PRODUCTO SEGUN ID CON METODO DE CLASE FUNCIONA!!!
router.get("/:id",async (request, response) => {
    const id = parseInt(request.params.id)
    const prod = await manager.getProductById(id) /* productos.find( e => e.id === id) */
    if (!prod) response.send({error:"Prodcuto no encontrado"})
    else response.send(prod)
})
  


//CREAR UN NUEVO PRODUCTO CON POST FUNCIONA!!!
router.post("/", (req,res) => {
    const newProdcut =  req.body
    manager.addProduct(newProdcut.title, newProdcut.description, newProdcut.price, newProdcut.thumbnail, newProdcut.code, newProdcut.stock)
    res.send({status:"success"})
    /*     {
      "title":"producto post",
      "description": "producto post1",
      "price":100000,
      "thumbnail":"por ahora no",
      "code":1584,
      "stock":26
  } */
})
//ACTUALIZAR UN PRODUCTO CON PUT SI FUNCIONA!!!
router.put("/", (request, response) => {
  let id = request.query.id //escribir en el navegador ?id=2&parametro=title&update=CambioTitulo
  let parametro = request.query.parametro
  let update = request.query.update

  manager.updateProduct(id,parametro,update)
  response.send({status:"success"})
})
// ELIMINAR UN PRODUCTO CON DELETE SI FUNCIONA
router.delete("/:id", (request, response) => {
  const id = parseInt(request.params.id)
  manager.deleteProduct(id)
  response.send({status:"success"})
})
export default router