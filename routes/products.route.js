import {ProductManager} from "../ProductManager.js"
import { Router } from "express";
const router = Router()

const manager = new ProductManager("BD.json");

/*     manager.addProduct({name:"a",description:"b",price:1231,thumbnail:"csaddas",code:"23123",stock:2312});
    manager.addProduct({name:"a",description:"b",price:1231,thumbnail:"csaddas",code:"2545",stock:2312});
 */
    let productos = await manager.getProducts()


  //MOSTRAR LISTA DE PRODUCTOS TOTALES FUNCIONA!!
router.get("/",async (request, response) => {
    response.send(await manager.getProducts())
  })
  // MOSTRAR PRODUCTOS SEGUN QUERY FUNCIONA !!
router.get("/query", async (request, response) => {
    let limit = request.query.limit //escribir en el navegador ?limit=2
    if (limit) {
        limit = limit.toLocaleLowerCase()
        const ProdFilter = await productos.filter(e => e.id <= limit)
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
router.post("/", async (req,res) => {
    const newProdcut =  req.body
    await manager.addProduct(newProdcut)
    res.send({status:"success"})
    /*     {
      "name":"producto post",
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