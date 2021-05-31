const express = require('express');
const router = express.Router();
const notes = require('../public/javascripts/notes_functions.js')
const validator = require('../public/javascripts/validator.js')





/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send({
  //   App: 'This is a note taking app',
  //   Features: ['add note','remove note','list note','modify note','get note'],
  //   Author: 'Ayus Das'
  //  })
  res.render('base')
});


/**
 * Add api call:
 * Using post request:
 * Using addmodValidation from validator.js
 */
router.post('/add', validator.addmodValidation, validator.errMsg,notes.addNote,async (req,res) =>{
  return res.status(404)
})


/**
 * List api call
 * Using get request
 */
router.get('/list',notes.listNotes,async (req,res)=>{
    return res.status(404)
})


/**
 * Remove api call
 * delValidation used
 * delete request used
 */
router.delete('/remove',validator.delVadition,validator.errMsg,notes.removeNote, async (req,res)=>{
  res.status(404)  
})

/**
 * modify api call
 * addmodValidation used
 * put request used
 */
router.put('/modify', validator.addmodValidation,validator.errMsg,notes.modifyNote,async(req,res)=>{
 return res.status(404)
})

/**
 * get api call 
 * get request used
 * delValidation used
 */

router.get('/get',validator.delVadition,validator.errMsg,notes.getNotes, async(req,res)=>{
  res.status(400)  
})

router.all('*', (req, res) => {
  res.status(404).send({
      Message: 'Page Not Found'
  })
})

module.exports = router;
