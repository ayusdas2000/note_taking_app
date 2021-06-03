const express = require('express');
const router = express.Router();
const notes = require('../src/notes_functions.js')
const validator = require('../src/validator.js')





/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('index',{
    viewTitle: "Insert Note"
  })
});


/**
 * Add api call:
 * Using post request:
 * Using addmodValidation from validator.js
 */
router.post('/add', validator.addmodValidation, validator.errMsg,notes.addmodNote,async (req,res) =>{
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
router.get('/remove/:id',notes.removeNote, async (req,res)=>{
  res.status(404)  
})

/**
 * modify api call
 * addmodValidation used
 * put request used
 */
router.get('/:id',notes.updateNotes,async(req,res)=>{
 return res.status(404)
})

router.all('*', (req, res) => {
  res.status(404).send({
      Message: 'Page Not Found'
  })
})

module.exports = router;
