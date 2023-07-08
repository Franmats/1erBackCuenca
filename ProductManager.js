import { readFile, writeFile, access, constants } from 'fs/promises';

export class ProductManager {

    #path
    constructor(path) {
        this.#path = path
        this.products = []
    }

    getProducts = async() => {
/*         access("./BD.json", constants.F_OK | constants.R_OK, async (error) => {
            if (error) {
              console.error(`No se puede acceder al archivo ${nombreArchivo}:`, error);
            } else {
                const productoString = JSON.stringify(this.products)
                writeFile("BD.json", productoString)
                let read = await readFile("./BD.json","utf-8").then(e => JSON.parse(e)).catch(e=> console.log("errror", e))// con jsonparse lo convertimos a objeto para mostralo en consola si existen o actualizan los datos 
                console.log("Productos",read)
                return read
            }
          }); */

        if (access("BD.json", constants.F_OK | constants.R_OK)) {

            let read = await readFile("./BD.json","utf-8").then(e => JSON.parse(e)).catch(e=> console.log("errror", e))// con jsonparse lo convertimos a objeto para mostralo en consola si existen o actualizan los datos 
            console.log("Productos",read)
            return read
        }

        
    }

    getNextId = () => {
        const count = this.products.length
        //[0,1,2,3,4,5] count = 6, count -1 = 5 obtengo el ultimo objeto y obtengo su id
        const nextID = (count > 0 ) ? this.products[count - 1].id + 1 : 1 
        return nextID
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {

        const producto = {
            id: this.getNextId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //VALIDACION QUE TODOS LOS ESPACIOS DE LOS PRDOCUTOS ESTEN LLENOS QUE TENGA TODOS LOS PARAMETROS (la idea es q si falta un parametro no lo pushee en el array de productos)
        let espaciosVacios = () => {
            let a = Object.values(producto).includes(undefined)// recorre el objeto producto convetido en array y asi no lo pushea al array principal
            let bolean = a ? console.log("Hay espacios vacios") : false
            return bolean
        }
       

        // VALIDACION QUE TODOS LOS PRODUCTOS TENGAN DIFERENTE CODE
        let codigoRepe = () => { 
            let a = this.products.filter(e => e.code == code) 
            let bolean = (a.length > 0) ? console.log("Hay un codigo repetido") :  false
            return bolean
        }


        // CONDICION FINAL PARA QUE LOS PUSHEE AL ARRAY
        if (espaciosVacios() === false && codigoRepe() === false) {

            this.products.push(producto)
            const productoString = JSON.stringify(this.products)
            writeFile("BD.json", productoString) //await para que se escriba antes que se lea

        }

    }

    //METODO PARA BUSCAR UN PRODUCTO SEGUN ID
    getProductById = async (id) => {
        this.products = await this.getProducts()

        const productoFiltrado = this.products.filter(e => e.id === id)
        console.log(productoFiltrado)
            
        if (productoFiltrado.length > 0 && typeof id == "number") { //VALIDO CON EL TYPE OF QUE LA ENTRADA DEL PARAMETRO SE SOLO UN NUMERO
            return productoFiltrado
        } else {
            return console.log("Not Found") }
    }


    deleteProduct = async (id)=> {
        this.products = await this.getProducts()
        let a = this.products.filter(prod => prod.id !== id)
        this.products = a
        const productoString = JSON.stringify(this.products)
        writeFile("BD.json", productoString) //await para que se escriba antes que se lea
        console.log("Producto Eliminado")
    }

    updateProduct = async (id, parametro, actualizacion)=> {
        this.products = await this.getProducts() 
        let n = this.products.find(e => e.id == id)
            
        switch (parametro) {
            case "title":
                n.title = actualizacion
                    
                break;
            case "description":
                n.description = actualizacion
                break;
            case "price":
                n.price = actualizacion
                break;
            case "stock":
                n.stock = actualizacion
                break;
            
            default:
                console.log("Parametro Incorrecto")
                break;
            }
        let a = this.products.filter(prod => prod.id !== id)
        this.products = a
        const productoString = JSON.stringify(this.products)
        writeFile("BD.json", productoString) //await para que se escriba antes que se lea
        console.log("Producto Modificado", n )
    }  
}



