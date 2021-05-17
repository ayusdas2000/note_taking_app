const path = require('path')
const express = require('express')
const notes = require('./notes.js')
const app = express()

console.log(path)

app.get('',(req,res)=>{
    res.send({
        App: 'This is a note taking app',
        Features: ['add note','remove note','list note','modify note','get note'],
        Author: 'This is a node.js project'
    })
})

app.get('/add', (req,res) =>{
    if(!req.query.title){
        return res.send({
            Message: 'Title can not be left blank'
        })
    }
    if(!req.query.body){
        return res.send({
            Message: 'Body can not be left blank'
        })
    }
    const note = notes.addNote(req.query.title,req.query.body)
    return res.send({
        Message: note
    })
})

app.get('/add/*',(req,res) =>{
    return res.send({
        Message: 'Query not added in proper format',
        Correct_format: '/add?title=ur_title&body=ur_body'
    })
})

app.get('/list',(req,res)=>{
    const note = notes.listNotes()
    if(!note){
        return res.send({
            Message: 'Notes is empty'
        })
    }
    return res.send(note)
})

app.get('/remove',(req,res)=>{
    if(!req.query.title){
        return res.send({
            Message: 'Title cannot be left blank'
        })
    }
    const note = notes.removeNote(req.query.title)
    return res.send({
        Message: note
    })
})

app.get('/modify',(req,res)=>{
    if(!req.query.title){
        return res.send({
            Message: 'Title can not be left blank'
        })
    }
    if(!req.query.body){
        return res.send({
            Message: 'Body can not be left blank'
        })
    }
    note = notes.modifyNote(req.query.title,req.query.body)
    return res.send({
        Message: 'Note modified successfully'
    })
})

app.get('/modify/*',(req,res) =>{
    return res.send({
        Message: 'Query not added in proper format',
        Correct_format: '/modify?title=ur_title&body=ur_body'
    })
})

app.get('/get',(req,res)=>{
    if(!req.query.title){
        return res.send({
            Message: 'title cannot be left blank'
        })
    }
    const note = notes.getNotes(req.query.title)
    return res.send(note)
})
 

app.get('*',(req,res) =>{
    return res.send({
        Title: 'Error 404',
        Message: 'Page Not Found' 
    })
})

app.listen(8000,()=>{
    console.log('Server is up on port 8000')
})