const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const mysql = require('mysql')


/**
 * setting up the database connection
 */
const poolConnection = mysql.createPool({
    connectionLimit: 10,
    host           : 'localhost',
    user           : 'root',
    password       : '',
    database       : 'notes_database'
  })

/**
 * getNotes function simply takes the title of the note and returns its body
 * @param {*} title 
 * @returns  the status and the note
 */
const getNotes = async(req,res) => {
    try{
        poolConnection.getConnection(async(err,connection)=>{
            if(err) throw err
            console.log(connection.threadId)
            await connection.query('SELECT title FROM notes WHERE title = ?',req.body.title,(err,column)=>{
                if(!err && Object.keys(column).length===0){
                    return res.status(501).send({
                        message: 'note not present'
                    })
                }
                else if(!err && Object.keys(column).length!==0){
                    connection.query(' SELECT * FROM notes WHERE title = ?',req.body.title,(err,rows)=>{
                        if(!err){
                            console.log(rows)
                            return res.status(201).send({
                                message: rows[0]
                            })
                        }
                        else{
                            console.log(err)
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })    
        })   
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
const addNote = (req,res) => {
    try{
        poolConnection.getConnection(async(err,connection)=>{
            if(err) throw err
            console.log(connection.threadId)
            await connection.query('SELECT title FROM notes WHERE title = ?',req.body.title,(err,column)=>{
                if(!err && Object.keys(column).length!==0){
                    return res.status(501).send({
                        message: 'note already present'
                    })
                }
                else if(!err && Object.keys(column).length===0){
                    connection.query('INSERT INTO notes SET ?',req.body,(err,rows)=>{
                        if(!err){
                            return res.status(201).send({
                                message: 'note successfully added'
                            })
                        }
                        else{
                            console.log(err)
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })    
        })   
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
const removeNote = (req,res) => {
    try{
        poolConnection.getConnection(async(err,connection)=>{
            if(err) throw err
            console.log(connection.threadId)
            await connection.query('SELECT title FROM notes WHERE title = ?',req.body.title,(err,column)=>{
                if(!err && Object.keys(column).length===0){
                    return res.status(501).send({
                        message: 'note not present'
                    })
                }
                else if(!err && Object.keys(column).length!==0){
                    connection.query('DELETE FROM notes WHERE title = ?',req.body.title,(err,rows)=>{
                        if(!err){
                            return res.status(201).send({
                                message: 'note successfully deleted'
                            })
                        }
                        else{
                            console.log(err)
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })    
        })   
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
        poolConnection.getConnection(async(err,connection)=>{
            if(err) throw err
            console.log(connection.threadId)
            await connection.query('SELECT title FROM notes WHERE title = ?',req.body.title,(err,column)=>{
                if(!err && Object.keys(column).length===0){
                    return res.status(501).send({
                        message: 'note not present'
                    })
                }
                else if(!err && Object.keys(column).length!==0){
                    connection.query('UPDATE notes SET body = ? WHERE title =?',[req.body.body,req.body.title],(err,rows)=>{
                        if(!err){
                            return res.status(201).send({
                                message: 'note successfully modified'
                            })
                        }
                        else{
                            console.log(err)
                        }
                    })
                }
                else{
                    console.log(err)
                }
            })    
        })   
    }

    catch(e){
        console.log(e)
    }    
}


/**
 * listNotes simply returns the list of notes
 * @returns the list of notes
 */
const listNotes = (req,res) => {
    try{
        poolConnection.getConnection(async(err,connection)=>{
            if(err) throw err
            console.log(connection.threadId)
            await connection.query('SELECT * FROM notes',(err,rows)=>{
                if(!err){
                    if(Object.keys(rows).length===0){
                        return res.status(504).send({
                            message: 'notes empty'
                        })
                    }
                    return res.status(200).send({
                        message: rows
                    })
                }
                else{
                    console.log(err)
                }
            })         
        })   
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
