'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var fileDataSchema = new mongoose.Schema({
    image_name: { type: String, required: true },
    encrypted_image_name: { type: String, required: true },
    abs_image_path: { type: String, required: true },
    rel_image_path: { type: String, required: true }
}, { timestamps: true }, { read: 'secondaryPreferred' });


var fileData = mongoose.model('fileData', fileDataSchema);

module.exports = {
    fileData: fileData
};
