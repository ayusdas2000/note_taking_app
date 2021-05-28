const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

/**
 * getNotes function simply takes the title of the note and returns its body
 * @param {*} title 
 * @returns  the status and the note
 */
const getNotes = async(title) => {
    try{
        const notes = await loadNotes()
        note = notes.filter((note) => note.title===title)
        if(!note.length){
            return ({
                status: 200,
                message: 'Note with title not present'
            })
        }
        else return ({
            status: 501,
            message: note
        })
    }
    catch(e){
        console.log(e)
    }       
}


/**
 * addNote function takes the title and body from us
 * and adds it to the json file
 * @param {*} title 
 * @param {*} body 
 * @returns the status and the message
 */
const addNote = async(title,body) => {
    try{
        const notes = await loadNotes()
        const duplicateNotes = notes.find((note) => note.title === title) 
        if (!duplicateNotes){
            notes.push({
                title: title,
                body: body,
            })
            await saveNotes(notes)
            return ({
                status: 201,
                message:'Note added successfully'
            })
        }
        else{
            return {
                status: 501,
                message:'Note title taken'
            }
        }
    }
    catch(e){
        console.log(e)
    }   
    
}


/**
 * removeNote takes the title and deletes that note from the json
 * @param {} title 
 * @returns the status and the message
 */
const removeNote = async(title) => {
    try{
        const notes = await loadNotes();
        const notesToKeep = notes.filter((note) => note.title!==title)

        if (notes.length > notesToKeep.length){
            saveNotes(notesToKeep)
            return {
                status: 201,
                message:'Note removed Successfully'  
            }       
        }
        else{
            return {
                status: 501,
                message: 'Note not present'
            }
        }
    }catch(e){
        console.log(e)
    }
}


/**
 * modifyNote takes the title and the body
 * modifiesy it with the new body
 * @param {*} title 
 * @param {*} body 
 * @returns the status and the message
 */
const modifyNote = async(title,body) => {
    try{
        const notes = await loadNotes();
        const notesToKeep = notes.filter((note) => note.title!==title)
        notesToKeep.push({
            title: title,
            body : body
        })
        saveNotes(notesToKeep)
        return ({
            status: 201,
            message: 'Note modified successfully'
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
const listNotes = async() => {
    try{
        const notes = await loadNotes()
        return notes
    }
    catch(e){
        console.log(e)
    }    
}


/**
 * saveNotes function acts as an helper function to 
 * other function to save function
 * @param {*} notes 
 */
const saveNotes = async (notes) => {
    try{
        const dataJSON = JSON.stringify(notes)
        await writeFileAsync('notes.json',dataJSON)
    }
    catch(e){
        console.log(e)
    }    
}


/**
 * loadNotes function loads the notes
 * from the json file
 * @returns 
 */
const loadNotes = async()=> {
    try {
        const dataBuffer = await readFileAsync('notes.json')
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
    modifyNote: modifyNote
}
