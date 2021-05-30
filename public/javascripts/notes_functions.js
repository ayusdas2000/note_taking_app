const fs = require('fs')
const { notes_sequelize } = require('../../models')//implementation of sequelizer


/**
 * getNotes function simply takes the title of the note and returns its body
 * @param {*} title 
 * @returns  the status and the note
 */
const getNotes = async(req,res) => {
    try{
        const result = await notes_sequelize.findAll({where: {title: req.body.title}})
        if(result.length === 0){
            res.status(504).send({
                message: 'note not present'
            })
        }
        else{
            res.status(201).send({
                message: result
            })
        }         
    }
    catch(e){
        console.log(e)
    }       
}


/**
 * addNote function takes the title and body from us
 * and inserts it into the sql database
 * @param {*} title 
 * @param {*} body 
 * @returns the status and the message
 */
const addNote = async(req,res) => {
    try{
        const result = await notes_sequelize.findAll({where: {title: req.body.title}})
        if(result.length !== 0){
            res.status(501).send({
                message: 'notes title taken'
            })
        }
        else{
            notes_sequelize.create({
                title: req.body.title,
                body: req.body.body
            })
            res.status(201).send({
                message: 'note successfully inserted'
            })
        }         
    }
    catch(e){
        console.log(e)
    }
    
}


/**
 * removeNote takes the title and deletes that note from the sql database
 * @param {} title 
 * @returns the status and the message
 */
const removeNote = async(req,res) => {
    try{
        const result = await notes_sequelize.findAll({where: {title: req.body.title}})
        if(result.length === 0){
            res.status(504).send({
                message: 'note not present'
            })
        }
        else{
            notes_sequelize.destroy({ where: {title: req.body.title} })
            res.status(201).send({
                message: 'note successfully deleted'
            })
        }         
    }
    catch(e){
        console.log(e)
    }
}


/**
 * modifyNote takes the title and the body
 * modify it with the new body
 * @param {*} title 
 * @param {*} body 
 * @returns the status and the message
 */
const modifyNote = async(req,res) => {
    try{
        const result = await notes_sequelize.findAll({where: {title: req.body.title}})
        if(result.length === 0){
            res.status(504).send({
                message: 'note not present'
            })
        }
        else{
            notes_sequelize.update({body: req.body.body},{where: {title: req.body.title}})
            res.status(201).send({
                message: 'note successfully modified'
            })
        }         
    }
    catch(e){
        console.log(e)
    }    
}


/**
 * listNotes simply returns the list of notes
 * @returns the list of notes
 */
const listNotes = async(req,res) => {
    try{
        const result = await notes_sequelize.findAll()
        if(result.length === 0){
            res.status(504).send({
                message: 'notes empty'
            })
        }
        else{
            res.status(200).send({
                notes: result
            })
        } 
    }
    catch(e){
        console.log(e)
    }    
}





module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    modifyNote: modifyNote
}
