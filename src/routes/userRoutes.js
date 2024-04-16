const UserController=require('../controllers/userController');

const UserRoutes=(base, app)=>{

    const controller=new UserController();
    app.post(`${base}/create`, async(req, res, next)=>{
        try {
            const {email, password, role}=req.body;
            const response=await controller.CreateNewUser(email, password, role);
            return res.status(201).json({message: 'Éxito al crear el usuario'});
        } catch (error) {
            console.error('Error al crear un nuevo usuario-->', error);
           return res.status(500).json({message: 'Ocurrió un error al intentar crear el usuario'});
        }
    });

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try {
            const id=req.params.id;
            const response=await controller.DeleteUserById(id);
            console.log("USUARIO ELIMINADO-->", JSON.stringify(response));
            return res.status(200).json({message: 'Éxito al eliminar el usuario'});
        } catch (error) {
            console.error('Error al eliminar un usuario-->', error);
            return res.status(500).json({message: 'Ocurrió un error al eliminar el usuario'});
        }
    })

};

module.exports=UserRoutes;