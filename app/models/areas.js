const mongoosePaginate=require('mongoose-paginate');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const areaSchema = new Schema({
    name			: String,
});

areaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Area', areaSchema);
