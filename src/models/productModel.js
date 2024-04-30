const mongoose=require('mongoose');
const {Schema}=mongoose;

const ProductSchema=new Schema({
    title: {
        type: String,
        required:[true, "El título es requerido"],
        minLength:4,
        maxLength:200,
        unique:true
    },
    description: {
        type: String,
        required:[true, "La descripción es requerida"],
        minLength:10,
        maxLength:200,
    },
    category : {
        type: String,
        required:[true, "La categoría es requerida"]
    },
    stock : {
        type: String,
        required:[true, "El stock es requerido"]
    },
    price : {
        type: String,
        required:[true, "El precio es requerido"]
    },
    image : {
        type: String,
        required:[true, "La imágen del producto es requerida"]
    }
},{
    timestamps: true
});

const ProductModel=mongoose.model("product", ProductSchema);

module.exports=ProductModel;