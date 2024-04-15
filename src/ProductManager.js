const fs = require('fs').promises

class ProductManager {
    constructor(){
        this.path = 'ProductManager/products.js'
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            let products = [];

            try {
                const data = await fs.readFile(this.path, 'utf8');
                if (data.trim() !== '') {
                    products = JSON.parse(data);
                }
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error('Error reading file:', error);
                }
            }

            const control_code = products.find(e => e.code === code);
            if(control_code){
                console.log("Error: A product with this code has already been entered");
                return;
            }

            const id = products.length + 1;

            const product = {
                id : id,
                title : title,
                description : description,
                price : price,
                thumbnail : thumbnail,
                code : code,
                stock : stock
            };

            products.push(product);

            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log('Product added successfully.');
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            const product_find = products.find(e => e.id === id);
            
            if (!product_find) {
                console.log("Error: Not Found");
                return null;
            } else {
                return product_find;
            }
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    }

    //IMPLEMENTO UN BORRADO LOGICO, BORRO LOS DATOS DEL PRODUCTO PERO NO BORRO EL ID.
    //OTRA SOLUCION SERIA PODER TENER DENTRO DE CADA PRODUCTO UN CAMPO "ELIMINADO" PARA SABER SI SE PUEDE MOSTRAR INFORMACION DE ESE PRODUCTO O NO.
    //SI SE REALIZARA DE ESTA FORMA, ENTONCES, AL PONER "ELIMINADO : TRUE" EL PRODUCTO NO SERIA DEVUELTO AL SER BUSCADO POR ID.
    async deleteProduct(id) {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            let products = JSON.parse(data);
            const index = products.findIndex(e => e.id === id);
    
            if (index === -1) {
                console.log("Error: Product not found");
                return;
            }
    
            const deletedProduct = products[index];
    
            const nullProduct = { id: deletedProduct.id };
            for (const key in deletedProduct) {
                if (key !== 'id') {
                    nullProduct[key] = null;
                }
            }
    
            products[index] = nullProduct;
    
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log('Product deleted successfully.');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async updateProduct(id, fieldToUpdate, newValue) {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);  
            const index = products.findIndex(e => e.id === id);
            
            if (index === -1) {
                console.log("Error: Product not found");
                return;
            }

            if (fieldToUpdate === 'id') {
                console.log("Error: Cannot update ID field");
                return;
            }

            if (!products[index].hasOwnProperty(fieldToUpdate)) {
                console.log("Error: Field to update is not valid");
                return;
            }

            products[index][fieldToUpdate] = newValue;

            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log('Product updated successfully.');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

}

module.exports = ProductManager;

//! Testing
//async function testProductManager() {
    //const productManager = new ProductManager();

    //Agregar algunos productos
    // await productManager.addProduct('Producto 1', 'Description 1', 11.99, 'imagen1.jpg', 'P1', 10);
    // await productManager.addProduct('Producto 2', 'Description 2', 22.99, 'imagen2.jpg', 'P2', 20);
    // await productManager.addProduct('Producto 3', 'Description 3', 33.99, 'imagen3.jpg', 'P3', 30);
    // await productManager.addProduct('Producto 4', 'Description 4', 44.99, 'imagen4.jpg', 'P4', 40);
    // await productManager.addProduct('Producto 5', 'Description 5', 55.99, 'imagen5.jpg', 'P5', 50);
 
    //Obtener todos los productos y mostrarlos
    //const allProducts = await productManager.getProducts();
    //console.log('All Products:', allProducts);

    //Obtener un producto por su ID
    // const productById = await productManager.getProductById(6);
    // console.log('Product by ID:', productById);

    //Eliminar un producto
    // await productManager.deleteProduct(2);

    //Actualizar un producto
    // await productManager.updateProduct(5, 'price', 100.99);

    //Mostrar todos los productos actualizados
    // const updatedProducts = await productManager.getProducts();
    // console.log('Updated Products:', updatedProducts);
//}
 
//testProductManager(); 