const UserModel=require('../models/userModel');
const bcrypt = require('bcrypt');
const helpers=require('../utils/helpersFunctions');
const jwt=require('jsonwebtoken');

class UserController{

    async CreateNewAdmin(email, password, name){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("Formato de email inválido")
            }

            if (!helpers.ValidatePassword(password)){
                throw new Error("Formato de password inválido")
            }
            if (!helpers.validateName(name)){
                throw new Error("Formato de password inválido")
            }
            const JUMP=parseInt(process.env.BCRYPT_JUMP);
            const hash=await bcrypt.hash(password, JUMP);
            const newUser= new UserModel({
                name:name,
                email:email,
                password:hash,
                role:'Admin'
            });

            const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async CreateNewUser(email, password,name){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("Formato de email inválido")
            }

            if (!helpers.ValidatePassword(password)){
                throw new Error("Formato de password inválido")
            }
            if (!helpers.validateName(name)){
                throw new Error("Formato de password inválido")
            }
            const JUMP=parseInt(process.env.BCRYPT_JUMP);
            const hash=await bcrypt.hash(password, JUMP);
            const newUser= new UserModel({
                name:name,
                email:email,
                password:hash,
                role:'User'
            });

            const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async DeleteUserById(id){
        try {
            const deletedUser=await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw error;
        }
    }

    async Login(req,res){
        try {
            const body=req.body;
            if(body.email===''||body.email===undefined){
                throw new Error("Debe enviar un email")
            }
            if(body.password===''||body.password===undefined){
                throw new Error("Debe enviar un password")
            }

            const user=await UserModel.findOne({email:body.email});

            if(user===null){
                return res.status(404).json({message: "Email y/o Password incorrectos"});
            }

            const compare=await bcrypt.compare(body.password, user.password);

            if (!compare) {
                return res.status(404).json({message: "Email y/o Password incorrectos"});
            }

            const token=jwt.sign({
                _id:user._id,
                role:user.role
            }, process.env.SECRET_KEY, {expiresIn:"7 days"});

            return res.status(200).json({email:user.email, role:user.role, token:token});

        } catch (error) {
            throw error;
        }
    }

    async GetAllUsers(req,res) {
        try {
            const users=await UserModel.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

};

module.exports=UserController;