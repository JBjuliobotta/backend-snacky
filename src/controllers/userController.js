const UserModel=require('../models/userModel');
const bcrypt = require('bcrypt');
const helpers=require('../utils/helpersFunctions');

class UserController{

    async CreateNewAdmin(email, password){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("Formato de email inválido")
            }

            if (!helpers.ValidatePassword(password)){
                throw new Error("Formato de password inválido")
            }
            const JUMP=parseInt(process.env.BCRYPT_JUMP);
            const hash=await bcrypt.hash(password, JUMP);
            const newUser= new UserModel({
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

    async CreateNewUser(email, password){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("Formato de email inválido")
            }

            if (!helpers.ValidatePassword(password)){
                throw new Error("Formato de password inválido")
            }
            const JUMP=parseInt(process.env.BCRYPT_JUMP);
            const hash=await bcrypt.hash(password, JUMP);
            const newUser= new UserModel({
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
};

module.exports=UserController;