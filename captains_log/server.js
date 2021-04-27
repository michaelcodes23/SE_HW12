const express = require('express')
const app = express();
const port = 3000;
//Mongoose Dependencies
//Allow us to post the form data
app.use(express.urlencoded({extended: true}))
//Creater Your Log in MongoDB
const mongoose = require('mongoose');
const captLogs = require('./models/logs.js');
//Connect Express to Mongoose
mongoose.connect('mongodb://localhost:27017/captlogs', {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


//--Routes Below
//Index
app.get('/logs/',(req, res) => {
    // res.render('index.ejs',{
    //     data: captLogs.find()
    // })
    captLogs.find({},(error, getLog)=>{
        console.log(getLog)
        res.render('index.ejs',{
            data: getLog
        })
    })
})



app.get('/pokemon', (req , res) => {
    
    res.render('index.ejs',{
        data: pokemon
        });
});
//route for new.ejs
app.get('/logs/new',(req, res) => {
    res.render('new.ejs')
})
//Post - Create Route
app.post('/logs',(req,res)=>{
    // res.send('received')
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    captLogs.create(req.body,(error, createdLog) =>{
        res.send(createdLog)
    })

    // res.redirect('/logs/show')
})

app.listen(port,()=>{
    console.log('listening on port',port)
})

