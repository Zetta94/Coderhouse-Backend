const ProductManager = require('./ProductManager');
const express = require('express');
const manager = new ProductManager('../ProductManager/products.js')

const app = express();                

const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    try {
        const response = await manager.getProducts();
        let limit = parseInt(req.query.limit);
        if (limit) {
            const arraylimit = response.slice(0, limit);
            return res.send(arraylimit);
        } else {
            return res.send(response);
        }
    } catch (error) {
        console.log(error);
        return res.send('No se pudo procesar el pedido');
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);
        const response = await manager.getProductById(pid);
        if (response) {
            return res.send(response);
        } else {
            console.log('Error, el producto no existe');
            return res.send('Error, el producto no existe');
        }
    } catch (error) {
        console.log(error);
        return res.send('No se pudo buscar por id');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
