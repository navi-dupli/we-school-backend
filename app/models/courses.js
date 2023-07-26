// app/models/courses.js
// load the things we need
const mongoosePaginate=require('mongoose-paginate');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

// define the schema for our course model
const courseSchema = mongoose.Schema({

    code            : String,
    name            : String,
    codeTeacher		: { type: Schema.Types.ObjectId, ref: 'User' },
    creationDate    : String,
    status          : String,
    description     : String,
    codeGrade		: { type: Schema.Types.ObjectId, ref: 'Grade' },

});

courseSchema.plugin(mongoosePaginate);

// create the model for courses and expose it to our app
module.exports = mongoose.model('Course', courseSchema);
