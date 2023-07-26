const mongoosePaginate=require('mongoose-paginate');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const activitySchema = new Schema({

    codeAchievement : { type: Schema.Types.ObjectId, ref: 'Achievement' },
    name			: String,
    description		: String,
    initDate		: String,
    endDate			: String,
    sendStatus		: String

});

activitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Activity', activitySchema);
