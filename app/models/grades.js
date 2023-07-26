const mongoosePaginate=require('mongoose-paginate');
const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    code            : String,
    name            : String,
    creationDate	: String,

});

gradeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Grade', gradeSchema);
