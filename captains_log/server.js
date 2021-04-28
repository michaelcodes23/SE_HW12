const express = require('express')
const app = express();
const port = 3000;
//Adding method to allow for deletion of entry
const methodOverride = require('method-override');

//Allow us to post the form data
app.use(express.urlencoded({extended: true}))
//use methodOverride
app.use(methodOverride('_method'));
//Creater Your Log in MongoDB
const mongoose = require('mongoose');
// const captLogs = require('./models/logs.js');
//Connect Express to Mongoose
mongoose.connect('mongodb://localhost:27017/captlogs', {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

const logsController = require('./controllers/logs_routes.js');
app.use('/logs', logsController);

app.listen(port,()=>{
    console.log('listening on port',port)
})

