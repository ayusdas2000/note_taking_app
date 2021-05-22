const fs = require('fs')
const chalk = require('chalk')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)


const getNotes = async(title) => {
    const notes = await loadNotes()
    note = notes.filter((note) => note.title===title)
    return note    
}

const addNote = async(title,body) => {
    //console.log("here is present")
    const notes = await loadNotes()
    console.log("working")
    const duplicateNotes = notes.find((note) => note.title === title) 
    if (!duplicateNotes){
        notes.push({
            title: title,
            body: body,
        })
        await saveNotes(notes)
        return 'Note added successfully'
    }
    else{
        return 'Note title taken'
    }
    
}

const removeNote = async(title) => {
    const notes = await loadNotes();
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

const modifyNote = async(title,body) => {
    const notes = await loadNotes();
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

const listNotes = async() => {
    const notes = await loadNotes()
    //console.log(notes)
    return notes
}

const readNote = async(title) =>{
    const notes = await loadNotes()
    const note = notes.find((note)=>note.title===title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}


const saveNotes = async (notes) => {
    const dataJSON = JSON.stringify(notes)
    await writeFileAsync('notes.json',dataJSON)
}

const loadNotes = async()=> {
    try {
        const dataBuffer = await readFileAsync('notes.json')
        const dataJSON = dataBuffer.toString()
        //console.log(dataJSON)
        return JSON.parse(dataJSON)
    } catch (e) {
        console.log(e)
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

// const returnValue=data.toString()
            // console.log(returnValue)
                // return returnValue