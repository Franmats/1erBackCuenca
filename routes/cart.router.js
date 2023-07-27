import {CartManager} from "../CartManager.js"
import { Router } from "express";
const router = Router()

const manager = new CartManager("carrito.json");


router.post("/", async (req, res)=> {
  await manager.createCart()
  res.send({exito:"Carrito creado"})
})


//BUSCAR POR CARRITO FUNCIONA
router.get("/:cid", async (req, res)=> {
    const cid = parseInt(req.params.cid)
    const prod = await manager.getCartById(cid)
    if (!prod) res.send({error:"Carrito no existente"})
    else res.send(prod)
})

// INTRODUCIR UN PRODUCTO EN UN DETERMINADO CARRITO CON ERRORES 
router.post("/:cid/product/:pid", async (req,res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const newProduct = req.body
    const resultado = await manager.createProductCart(cid, pid, newProduct)
    
    res.send(resultado)
    
    /*     {
      "product":"1",
      "quantity": "1",

  } */
})

export default router

