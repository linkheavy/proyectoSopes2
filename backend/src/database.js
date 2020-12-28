const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/games-db-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db=>console.log('DB esta conectado'))
.catch(err => console.error(err));