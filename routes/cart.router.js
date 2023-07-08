import {CartManager} from "../CartManager.js"
import { Router } from "express";
const router = Router()

const manager = new CartManager("carrito.json");

manager.createCart(1)
manager.createCart(2)




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
    const pid = parseInt(req.params.id)
    const newProdInCart =  req.body
    manager.createProductCart(cid, newProdInCart.product, newProdInCart.quantity)
    
    


    res.send({status:"success"})
    /*     {
      "product":"1",
      "quantity": "1",

  } */
})

export default router