const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema ({
    id: {
        type: String,
        requred: true
    },
    url: {
        type: String,
        requred: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        requred: true
    }
});

module.exports = mongoose.model('URL', UrlSchema);