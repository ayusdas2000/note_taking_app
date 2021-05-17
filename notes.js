const fs = require('fs')
const chalk = require('chalk')


const getNotes = (title) => {
    const notes = loadNotes()
    note = notes.filter((note) => note.title===title)
    return note    
}

const addNote = (title,body) => {
    //console.log("here is present")
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => note.title === title) 
    if (!duplicateNotes){
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        return 'Note added successfully'
    }
    else{
        return 'Note title taken'
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title!==title)

    if (notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        return 'Note removed Successfully'        
    }
    else{
        return 'No note found'
    }
    //console.log(title)
}

const modifyNote = (title,body) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title!==title)
    notesToKeep.push({
        title: title,
        body : body
    })
    //saveNotes(notesToKeep)
    //notesToKeep.push(note)
    saveNotes(notesToKeep)
    //console.log(notesToKeep)
    return notesToKeep
}

const listNotes = () => {
    const notes = loadNotes()

    //console.log(chalk.inverse('Your notes'))

    // notes.forEach((note) => {
    //     console.log(note.title)
    // })
    return notes
}

const readNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.title===title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
        
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    modifyNote: modifyNote
}