import { readFile, writeFile, access, constants } from 'fs/promises';

export class CartManager {

    #path
    constructor(path) {
        this.#path = path
        this.carts = []
        this.product = []
    }

    getProductsCart = async() => {
        if (access("carrito.json", constants.F_OK | constants.R_OK)) {

            let read = await readFile("./carrito.json","utf-8").then(e => JSON.parse(e)).catch(e=> console.log("errror", e))// con jsonparse lo convertimos a objeto para mostralo en consola si existen o actualizan los datos 
            console.log("Productos en el carrito",read)
            return read
        }        
    }

    getNextId = (array) => {
        const count = array.length
        //[0,1,2,3,4,5] count = 6, count -1 = 5 obtengo el ultimo objeto y obtengo su id
        const nextID = (count > 0 ) ? array[count - 1].id + 1 : 1 
        return nextID
    }
    createCart = (num) => {

        const cart = {
            carrito: num,
            id: this.getNextId(this.carts),
            products: this.product
        }
        this.carts.push(cart)
        const carritoString = JSON.stringify(this.carts)
        writeFile("carrito.json", carritoString)

        }

    

    //METODO PARA BUSCAR UN PRODUCTO SEGUN ID
    getCartById = async (id) => {
        this.carts = await this.getProductsCart()

        const carritoFiltrado = this.carts.filter(e => e.id === id)
            
        if (carritoFiltrado.length > 0 && typeof id == "number") { //VALIDO CON EL TYPE OF QUE LA ENTRADA DEL PARAMETRO SE SOLO UN NUMERO
            return carritoFiltrado
        } else {
            return console.log("Not Found") }
    }

    createProductCart = async (cid,productId, cantidad)=> {

        const isRepeated = this.product.some(e => e.productoId == productId) //buscamos con el metodo some algún producto q este repetido y nos devuelva un valor boleano
        if (isRepeated) { // si el producto esta repetido
            const product = this.product.find(e => e.productoId  == productId) // el metodo find busca el producto repetido segun el id
            product.cantidad++ // modifica el valor de la cantidad y no pushea otro producto igual al carrito
        }
        let buscar = await this.getProductsCart()
        let a = buscar.find(e => e.id === cid)
        if(cid == 1 && !isRepeated) {
            const producto = {
                productoId :productId,
                cantidad
            }
            let b = a.products.push(producto)
            console.log(b)
            this.product.push(b)
            const carritoString = JSON.stringify(this.carts)
            writeFile("carrito.json", carritoString)
          } else if(cid == 2 && !isRepeated ) {
            let b = a.products.push(producto)
            console.log(b)
            this.product.push(b)
            const carritoString = JSON.stringify(this.carts)
            writeFile("carrito.json", carritoString)
          } else return console.log("error")

    }


}
