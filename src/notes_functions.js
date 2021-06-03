const fs = require('fs')
const { notes_sequelize } = require('../models')//implementation of sequelizer

/**
 * This functions runs during adding notes and modifying note
 * If id is null then it adds the data if not null it runs the 
 * modifNote function if the else statement
 * @param {*} req 
 * @param {*} res 
 */

const addmodNote = async(req,res) => { 
    try{
        console.log(req.body.id)
        if(req.body.id === ''){
            const result = await notes_sequelize.findAll({where: {title: req.body.title}})
            if(result.length !== 0){
                res.status(403).render('index',{//status 403: forbidden request
                    viewTitle: 'Note title taken'
                })
            }
            else{
                await notes_sequelize.create({
                    title: req.body.title,
                    body: req.body.body
                })
                const data = await notes_sequelize.findAll()
                res.status(201).render('list',{//status 201: request created and fullfilled
                    list: data
                })
            }
        }else{
            modifyNote(req,res)
        }                 
    }
    catch(e){
        console.log(e)
        res.status(500)
    }
    
}



/**
 * This function runs for the delete operation
 * @param {*} req 
 * @param {*} res 
 */
const removeNote = async(req,res) => {
    try{
        console.log(req.params)
        await notes_sequelize.destroy({ where: {id: req.params.id} })
        const data = await notes_sequelize.findAll()
        res.status(201).render('list',{//status 201: request has been accepted and new resource created after delete
            list: data
        })       
    }
    catch(e){
        console.log(e)
        res.status(500)
    }
}

/**
 * this if modifyNote function which runs in the else condition of addmodNote function
 * @param {*} req 
 * @param {*} res 
 */
const modifyNote = async(req,res) => {
    try{
        await notes_sequelize.update({body: req.body.body},{where: {title: req.body.title}})
        const result = await notes_sequelize.findAll()
        res.status(201).render('list',{//status code 201: request accepted and new resource created after modification
            list: result 
        })                
    }
    catch(e){
        console.log(e)
        res.status(500)
    }    
}

/**
 * listNotes function is used to list the notes in the list hbs engine
 * @param {*} req 
 * @param {*} res 
 */

const listNotes = async(req,res) => {
    try{
        const result = await notes_sequelize.findAll()
        res.status(200).render('list',{
            list: result
        })
    }
    catch(e){
        console.log(e)
        res.status(500)
    }    
}

/**
 * this is update note function, this function is used to render the insert 
 * notes page with title of update notes and all the values are pre filled
 * this function is like a helper function
 * @param {*} req 
 * @param {*} res 
 */
const updateNotes = async(req,res) =>{
    try{
        const result = await notes_sequelize.findAll({where: {id: req.params.id}})
        res.status(201).render('index',{
            viewTitle: 'Update Employee',
            data:      result[0].dataValues
        })   
    }
    catch(e){
        console.log(e)
        res.status(500)
    }
}





module.exports = {
    addmodNote: addmodNote,
    removeNote: removeNote,
    listNotes: listNotes,
    modifyNote: modifyNote,
    updateNotes: updateNotes
}
