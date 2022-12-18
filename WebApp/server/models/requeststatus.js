const mongoose = require('mongoose')

const RequestStatus = new mongoose.Schema({
    date: {type: String, required: true },
    customer: {type: String, required: true },
    customer_id:{type: String, required: true, unique: true},
    volume: {type: String, required: true},
    }, 
    { collection: 'requeststatus' }
)

const model = mongoose.model('RequestStatus', RequestStatus)

module.exports = model