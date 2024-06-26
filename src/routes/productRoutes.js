const ProductController=require('../controllers/productController');
const Auth=require('../utils/authMiddlewares');

const ProductRoutes=(base, app)=>{
    const controller=new ProductController();

    app.post(`${base}/`, Auth.isAuth, Auth.isAdmin, async(req, res)=>{
        try {
            const {title, description, category, stock, price, image}=req.body;
            await controller.Create(title, description, category, stock, price, image);
            return res.status(201).json({message: "Éxito al crear el producto"});
        } catch (error) {
            console.error("Error al crear un producto-->", error);
            return res.status(500).json({message: "Ocurrió un error al intentar crear un nuevo producto"});
        }
    });

    app.get(`${base}/`, async(req, res)=>{
        try {
            
            const {filter, search}=req.query;
            console.log("valor de la query filter", filter);
            const response=await controller.GetAllProducts(filter, search);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error al obtener todos los productos-->", error);
            return res.status(500).json({message:"Ocurrió un error al intentar obtener los producto"});
        }
    });

    app.get(`${base}/:id`, async(req, res)=>{
       try {
        const {id}=req.params;
        const response=await controller.GetById(id);
        return res.status(200).json(response);
       } catch (error) {
            console.log(`Error al obtener el producto con id: ${id}-->`, error);
            return res.status(500).json({message: "Ocurrió un error al intentar obtener el producto"});
       } 
    });

    app.put(`${base}/update`, Auth.isAuth, Auth.isAdmin, async (req, res)=>{
        try {
            const product=req.body;
            await controller.UpdateProduct(product);
            return res.status(200).json({message: "Éxito al actualizar el producto"});
        } catch (error) {
            console.log(`Error al actualizar un producto -->`, error);
            return res.status(500).json({message: "Ocurrió un error al intentar actualizar un producto"});
        }
    });

    app.delete(`${base}/:id`, Auth.isAuth, Auth.isAdmin, async(req, res)=>{
        try {
            const {id}=req.params;
            await controller.DeleteProduct(id);
            return res.status(200).json({message: "Éxito al eliminar el producto"});
        } catch (error) {
            console.log(`Error al eliminar un producto -->`, error);
            return res.status(500).json({message: "Ocurrió un error al intentar eliminar el producto"});
        }
    })
}

module.exports=ProductRoutes;