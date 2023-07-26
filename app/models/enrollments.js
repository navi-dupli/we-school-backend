const mongoosePaginate=require('mongoose-paginate');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enrollmentSchema = new Schema({

    codeUser		: { type: Schema.Types.ObjectId, ref: 'User' },
    codeGrade		: { type: Schema.Types.ObjectId, ref: 'Grade' },
    year			: String,

});

enrollmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
