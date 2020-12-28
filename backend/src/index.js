const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

//inicialización
const app = express();
require('./database');
//configuraciones
app.set('port',process.env.PORT || 8000);

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));


//rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/videojuego'));
app.use(require('./routes/games'));

//servidor
app.listen(
    app.get('port'), () => {
        console.log('Servidor corriendo en', app.get('port'))
    }
);