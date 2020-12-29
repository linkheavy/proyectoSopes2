const mongoose = require('mongoose');
mongoose.connect('mongodb://34.68.166.141:27017/admin',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    "auth": { "authSource": "admin" },
    "user": "admin",
    "pass": "cSuY554p+8xyq88Y9t7Fmc3lkMEups5tEusZOaHhJ1x19Ojz4uFRMQHYP84PFxn0JZnoA2K4LwGm3d0G"
})
.then(db=>console.log('DB esta conectado'))
.catch(err => console.error(err));