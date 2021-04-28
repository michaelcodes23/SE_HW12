const express = require('express');
const router = express.Router();
const captLogs = require('../models/logs.js');


//--Routes Below



//route for new.ejs
router.get('/new',(req, res) => {
    res.render('new.ejs')
})

//Post - Create Route for New Ship Logs
router.post('/',(req,res)=>{
    // res.send('received')
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    captLogs.create(req.body,(error, createdLog) =>{
        res.redirect('/logs/');
    })

    // res.redirect('/logs/show')
})

//Index
router.get('/',(req, res) => {
    // res.render('index.ejs',{
    //     data: captLogs.find()
    // })
    captLogs.find({},(error, getLog)=>{
        res.render('index.ejs',{
            data: getLog
        })
    })
})

//route for show.ejs
router.get('/:id', (req, res) => {
    captLogs.find({},(error, getLog)=>{
        console.log(getLog[req.params.id])
        res.render('show.ejs', {
            data: getLog[req.params.id]
        })
    })

    // res.send("Your ship id is " + [req.params.id])
})

//Edit
router.get('/:id/edit', (req, res) =>{
    // res.send('Update Pokemon' + req.params.id)
  captLogs.findById(req.params.id,(error, getLog)=>{
    console.log(getLog[req.params.id])
    res.render('edit.ejs', {
        data: getLog
    })
})
})

//Update Route - for updating Ship Logs

router.put('/:id', (req, res) => {

    captLogs.findOneAndUpdate(req.params.id, req.body, {new : true}, (err, getLog) => {
        res.redirect('/logs/')
    })
})

//Delete
router.delete('/:id',(req,res)=>{

    captLogs.findByIdAndDelete(req.params.id).then(
        res.redirect('/logs')
    )
    
})


module.exports = router;