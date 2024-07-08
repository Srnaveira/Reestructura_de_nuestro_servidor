const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const passport = require('passport');
const usersServices = require('./services/usersServices.js')
const initializePassport = require('./config/passport.config.js');
const socketServer = require('./socket.js')
// Routes
const cartsRoutes = require('./routes/carts.router.js');
const productsRouter = require('./routes/products.router.js');
const viewRoutes = require('./routes/view.router.js');
const usersRoutes = require('./routes/users.router.js');
const seccionsRoutes = require('./routes/api/sessions.router.js');

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

initializePassport();
app.use(usersServices.sessionConfig());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); 
app.use(express.static(__dirname + '/public')); 

// Middleware para manejar datos de usuario en las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


// EndPoints
app.use('/', usersRoutes)
app.use('/api/sessions/', seccionsRoutes)
app.use('/api/admin/', viewRoutes)
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRoutes);


const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Aplicación funcionando en el puerto: ${process.env.PORT}`);
});


socketServer(httpServer);