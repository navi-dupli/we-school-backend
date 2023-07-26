const mongoosePaginate=require('mongoose-paginate');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subjectSchema = new Schema({

    code 			: String,
    name			: String,
    codeArea		: { type: Schema.Types.ObjectId, ref: 'Area' },
    initDate		: String,
    status			: String,
    description		: String

});

subjectSchema.plugin(mongoosePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Subject', subjectSchema);
