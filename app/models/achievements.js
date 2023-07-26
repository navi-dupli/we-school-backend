const mongoosePaginate=require('mongoose-paginate');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const achievementSchema = new Schema({

    codeSubject		: { type: Schema.Types.ObjectId, ref: 'Subject'},
    codeGrade		: { type: Schema.Types.ObjectId, ref: 'Grade' },
    name			: String,
    description		: String,
    period			: String,

});

achievementSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Achievement', achievementSchema);
