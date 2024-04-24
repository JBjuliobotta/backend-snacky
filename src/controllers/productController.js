const ProductModel=require('../models/productModel');
const helpers=require('../utils/helpersFunctions');

class ProductController{
    async Create(title, description, category, stock, price, image){
        try {
            if(!helpers.validateTitle(title)||!helpers.validateDescription(description)||!helpers.validateCategory(category)
            ||!helpers.validateStock(stock)||!helpers.validatePrice(price)||!helpers.validateIMG(image)
            ){
                throw new Error("Error en alguno de los campos");
            }
            const product=new ProductModel({
                title: title,
                description: description,
                category: category,
                stock: stock,
                price: price,
                image: image
            });

            await product.save();
        } catch (error) {
            throw error;
        }
    };

    async GetAllProducts(filter){
        try {
            let finalResponse=[];
            if (filter==undefined){
                finalResponse=await ProductModel.find();
            }else {
                finalResponse=await ProductModel.find({
                    category: filter
                });
            }
            return finalResponse;
            
        } catch (error) {
            throw error;
        }
    };

    async GetById(id){
        try {
            const product=await ProductModel.findById(id);
            return product;
        } catch (error) {
            throw error;
        }
    };

    async UpdateProduct(product){
        try {
            await ProductModel.findByIdAndUpdate(product._id, product);
        } catch (error) {
            throw error
        }
    };

    async DeleteProduct(id){
        try {
            await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw error
        }
    }


};

module.exports=ProductController;