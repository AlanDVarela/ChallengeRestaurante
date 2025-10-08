import express, {static as static_} from 'express';
import dotenv from 'dotenv'
dotenv.config();

import swaggerJsDoc from 'swagger-jsdoc'
import { setup, serve} from  'swagger-ui-express'
import swaggerOptions  from './../swagger.config';
import dbConnect from './database/index'


import routes from './app/routes'
import path from 'path'

const port = process.env.PORT || 3000;
const app = express();




// Parse JSON bodies
app.use(express.json());

app.use('/static', static_(path.join(__dirname, '..','public')));

// Register routes (they expect JSON body parsing)
app.use(routes);

app.get('', (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
//Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', serve, setup(swaggerDocs))
//Base de datos y listen 
 dbConnect().then(() => {

     app.listen(port, ()=>{
         console.log(`API corriendo en puerto ${port}`)
     })
 }).catch(() => {
     console.log("Failed to connect to db ")
})
