import { readFile, writeFile, access, constants } from 'fs/promises';

export class ProductManager {

    #path
    constructor(path) {
        this.#path = path
    }

    getProducts = async() => {
        try {
            const fileExists = await access("BD.json", constants.F_OK | constants.R_OK)
            if (fileExists == undefined ) {
                const data = await readFile("./BD.json", "utf-8");
                const read = JSON.parse(data)
                return read;
            } else {
                await writeFile("BD.json", "[]", "utf-8");
                console.log("El archivo BD.json fue creado.");
                return [];
            }
        } catch (error) {
            console.error("Error al leer o crear el archivo:", error);
            return []; 
        }  
    }

    getNextId = async () => {
        let p = await this.getProducts()
        let count =  p.length
        const lastProductId = count > 0 ? p[count - 1].id : 0; 
        const nextID = lastProductId + 1;
        return nextID;     
    }
    addProduct = async (prod) => {

        let title = prod.name
        let description = prod.description
        let price = prod.price
        let thumbnail = prod.thumbnail
        let code = prod.code
        let stock = prod.stock
        const producto = {
            id: await this.getNextId(),//sin el await el metodo no funciona
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //VALIDACION QUE TODOS LOS ESPACIOS DE LOS PRDOCUTOS ESTEN LLENOS QUE TENGA TODOS LOS PARAMETROS (la idea es q si falta un parametro no lo pushee en el array de productos)
        let espaciosVacios = async () => {
            let a = Object.values(producto).includes("")
            let l = Object.values(producto).includes(null)//valida si se encuentra algun espacio vacio
            if((a == false) && (l == false)) {
                return false
            } else return true
        
        }
       

        // VALIDACION QUE TODOS LOS PRODUCTOS TENGAN DIFERENTE CODE
        let codigoRepe = async () => { 
            let promise = await this.getProducts()
            let a = promise.filter(e => e.code == code) 
            let bolean = (a.length > 0) ? console.log("Hay un codigo repetido") : false
            return bolean
        }


        // CONDICION FINAL PARA QUE LOS PUSHEE AL ARRAY
        if ((await espaciosVacios() === false) && (await codigoRepe() === false)) {
            let a = await this.getProducts()
            a.push(producto)
            const productoString = JSON.stringify(a)
            console.log("Producto escrito");
            await writeFile("BD.json", productoString) //await para que se escriba antes que se lea

        }


    }

    //METODO PARA BUSCAR UN PRODUCTO SEGUN ID
    getProductById = async (id) => {
        let n= await this.getProducts()
        const productoFiltrado = n.filter(e => e.id === id)
            
        if ((productoFiltrado.length > 0) && (typeof id == "number")) { //VALIDO CON EL TYPE OF QUE LA ENTRADA DEL PARAMETRO SE SOLO UN NUMERO
            return productoFiltrado
        } else {
            return console.log("Not Found") }
    }


    deleteProduct = async (id)=> {
        console.log(id);
        let b = await this.getProducts()
        let a = b.filter(prod => prod.id != id)

        b = a
        const productoString = JSON.stringify(b)
        console.log("Producto Eliminado", a)
        await writeFile("BD.json", productoString) 
    }

    updateProduct = async (id, parametro, actualizacion)=> {
        let m = await this.getProducts() 
        let n = m.find(e => e.id == id)
            
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
        const a = await m.filter(prod => prod.id !== id)
        const productoString = JSON.stringify(a)
        await writeFile("BD.json", productoString) 
        console.log("Producto Modificado", n )
    }  
}



