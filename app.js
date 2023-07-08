import express from "express";
import productRouter from "./routes/products.route.js"
import cartRouter from "./routes/cart.router.js"

const app = express();
app.use(express.json())

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(8080, () => console.log("Running on 8080..."))