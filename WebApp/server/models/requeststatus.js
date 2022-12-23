const mongoose = require('mongoose')

const RequestStatus = new mongoose.Schema({
    customer_id: {type: String, required: true, unique: true},
    customer: {type: String, required: true},
    category: {type: String, required: true },
    packet_type: {type: String, required: true },
    quantity:{type: String, required: true},
    }, 
    { collection: 'requeststatus' }
)

const model = mongoose.model('RequestStatus', RequestStatus)

module.exports = model