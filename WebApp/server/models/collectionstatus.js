const mongoose = require('mongoose')

const CollectionStatus = new mongoose.Schema({
    date: {type: String, required: true },
    customer: {type: String, required: true },
    customer_id:{type: String, required: true, unique: true},
    volume: {type: String, required: true},
    }, 
    { collection: 'collectionstatus' }
)

const model = mongoose.model('CollectionStatus', CollectionStatus)

module.exports = model