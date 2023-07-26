const mongoosePaginate=require('mongoose-paginate');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enrollmentSubjectSchema = new Schema({

    codeSubject		: { type: Schema.Types.ObjectId, ref: 'Subject' },
    codeCourse		: { type: Schema.Types.ObjectId, ref: 'Course' },
    codeTeacher		: { type: Schema.Types.ObjectId, ref: 'User' },
    hourlyintensity	: String, //intensidad horaria

});

enrollmentSubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('EnrollmentSubjects', enrollmentSubjectSchema);
