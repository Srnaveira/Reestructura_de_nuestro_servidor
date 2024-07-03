const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
// No necesitas importar utils.js
// Routes
const cartsRoutes = require('./routes/carts.router.js');

dotenv.config();

// Inicializo App
const app = express();

// Define el motor de plantillas
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); 
app.use(express.static(__dirname + '/public')); 

// EndPoints
app.use('/api/carts/', cartsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Aplicación funcionando en el puerto: ${process.env.PORT}`);
})