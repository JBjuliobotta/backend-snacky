const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const path=require('path');
//const { request } = require('http');

//instancia de express
const app=express();

//acceso a variables de entorno
require('dotenv').config();
//puerto de ejección de nuestro servidor-backend
app.set('port', process.env.PORT || 9000);
//escucha en un puerto de nuestro backend
app.listen(app.get('port'), ()=>{console.log(`Backend Snacky Listening in port ${app.get('port')}`);});

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

//archivos estaticos
app.use(express.static(path.join(__dirname,'../public')));

//ruta de prueba
app.get('/test', async(req, res, next)=>{
    try {
        console.log('REQUEST-->', req);
        return res.status(200).json({success:true, message:'API IS ALIVE'});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

