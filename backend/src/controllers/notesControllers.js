const controller = {}
const Note = require('../models/note')

controller.getNotes = async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
}

controller.createNote = async (req, res) => {
    const {title, content, date, author} = req.body
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author,
    })
    await newNote.save()
    res.json({message: 'Note saved'})
}

controller.getNote = async (req, res) => {
    let note = await Note.findById(req.params.id)
    res.json(note)
}

controller.updateNote = async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body)
    res.json({"message": 'Note updated'})
}

controller.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({"message": 'Note deleted'})
}

module.exports = controller
