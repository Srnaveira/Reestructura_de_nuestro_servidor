const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars');

//Routes
const cartsRoutes = require('./routes/carts.router.js')


dotenv.config();
//inicializo App:
const app = express();


//define el motor de pLanillas
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//EndPoints

app.use('/api/carts/', cartsRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`Aplicacion funcionando en el port: ${process.env.PORT}`)

})