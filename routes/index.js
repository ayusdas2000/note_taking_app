const express = require('express');
const router = express.Router();
const notes = require('../public/javascripts/notes_functions.js')
const validator = require('../public/javascripts/validator.js')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    App: 'This is a note taking app',
    Features: ['add note','remove note','list note','modify note','get note'],
    Author: 'Ayus Das'
   })
});


/**
 * Add api call:
 * Using post request:
 * Using addmodValidation from validator.js
 */
router.post('/add', validator.addmodValidation, validator.errMsg,async (req,res) =>{
  try{
    const note = await notes.addNote(req.body.title,req.body.body)
    res.status(201).send({
      message: note.message
    })
  }catch(e){
    console.log(e)
    res.status(500).send({
      Error: e
    })
  }
})


/**
 * List api call
 * Using get request
 */
router.get('/list',async (req,res)=>{
  try{
    const note = await notes.listNotes()
    if(!note){
      return res.status(504).send({
        Message: 'Notes empty'
      })
    }
    return res.status(200).send(note)
  }
  catch(e){
    return res.status(500).send({
      Error: e
    })
  }  
})


/**
 * Remove api call
 * delValidation used
 * delete request used
 */
router.delete('/remove',validator.delVadition,validator.errMsg, async (req,res)=>{
  try{
    const note = await notes.removeNote(req.body.title)
    return res.status(note.status).send({
      Message: note.message
    })
  }catch(e){
    return res.status(501).send({
      Error: e
    })
  }
  
})

/**
 * modify api call
 * addmodValidation used
 * put request used
 */
router.put('/modify', validator.addmodValidation,validator.errMsg,async(req,res)=>{
 try{
   note = await notes.modifyNote(req.body.title,req.body.body)
   return res.status(note.status).send({
      Message: note.message
  })
 }  
 catch(e){
   return res.status(500).send({
     Error: e
   })
 }
})

/**
 * get api call 
 * get request used
 * delValidation used
 */

router.get('/get',validator.delVadition,validator.errMsg, async(req,res)=>{
  try{
    const note = await notes.getNotes(req.body.title)
    return res.status(note.status).send({
      Message: note.message
    })
  }
  catch(e){
    return res.status(500).send({
      Error: e
    })
  }
  
})

router.all('*', (req, res) => {
  res.status(404).send({
      Message: 'Page Not Found'
  })
})

module.exports = router;
