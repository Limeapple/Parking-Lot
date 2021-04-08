const {model, Schema} = require('mongoose')

const studentSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    password: String,
    gradeLevel: String
})

module.exports = model('Student', studentSchema)