const mongoose = require('mongoose')

const CollectionStatus = new mongoose.Schema({
    customer_id: {type: String, required: true, unique: true},
    customer: {type: String, required: true},
    category: {type: String, required: true },
    packet_type: {type: String, required: true },
    quantity:{type: String, required: true},
    }, 
    { collection: 'collectionstatus' }
)

const model = mongoose.model('CollectionStatus', CollectionStatus)

module.exports = model