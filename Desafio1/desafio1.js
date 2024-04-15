class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct (title,description,price,thumbnail,code,stock){
        const id = this.products.length + 1
        const control_code = this.products.find(e => e.code === code)

        if(control_code){
            return console.log("Error: A product with this code has already been entered")
        }

        const product = {
            id : id,
            title : title,
            description : description,
            price : price,
            thumbnail : thumbnail,
            code : code,
            stock : stock
        }
        this.products.push(product)
    }

    getProducts () {
        return this.products
    }

    getProductById(id){
        const product_find = this.products.find(e => e.id === id)
        if(!product_find){
            return console.log("Error: Not Found")
        }
        else{
            return product_find
        }
    }

}

/*
TESTING

const product_manager = new ProductManager()
console.log(product_manager.getProducts())
product_manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
console.log(product_manager.getProducts())
product_manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
console.log(product_manager.getProductById(5))
*/