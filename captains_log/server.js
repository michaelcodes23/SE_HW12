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
        res.render('index.ejs',{
            data: getLog
        })
    })
})


//route for new.ejs
app.get('/logs/new',(req, res) => {
    res.render('new.ejs')
})
//route for show.ejs
app.get('/logs/:id', (req, res) => {
    captLogs.find({},(error, getLog)=>{
        console.log(getLog[req.params.id])
        res.render('show.ejs', {
            data: getLog[req.params.id]
        })
    })

    // res.send("Your ship id is " + [req.params.id])
})

//Post - Create Route for New Ship Logs
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
//Edit
app.get('/logs/:id/edit', async (req, res) =>{
    // res.send('Update Pokemon' + req.params.id)
  captLogs.find({},(error, getLog)=>{
    console.log(getLog[req.params.id])
    res.render('edit.ejs', {
        data: getLog[req.params.id],
        id: req.params.id
    })
})
})

//Update Route - for updating Ship Logs

app.put('/logs/:id', (req, res) => {

    captLogs.find({},(error, getLog)=>{
        console.log('Req.body is Pus: ' + getLog[req.params.id])
    })
    res.redirect('/logs/');
})

//Delete
app.delete('/logs/:id',(req,res)=>{

    captLogs.find({},(error, getLog)=>{
        console.log("trying to delete now test 2 " + getLog[req.params.id])
        // getLog.splice(getLog[req.params.id],1)
        getLog.splice(req.params.id,1);
        console.log(getLog);
        
    })
    res.redirect('/logs')
    
})

app.listen(port,()=>{
    console.log('listening on port',port)
})

