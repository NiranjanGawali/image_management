var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var config = require('./../../config');
var logger = require('../../logger/log');
var fileData = require('../fileManagement/fileModel').fileData;
var commonCntr = require('./../commonManagement/commonController');
var fs = require('fs');

var absolutePath = path.resolve(config.FILE_PATH);

/* Upload file data */
router.post('/file', async function (req, res, next) {

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // return console.log(absolutePath);

    try {
        var uploadFileArray = [];
        var file = req.files.file;
        if (file instanceof Array) {
            uploadFileArray = file
        }
        else {
            uploadFileArray.push(file)
        }

        await Promise.all(uploadFileArray.map(async (singleFile) => {
            let operationStatus = await insertFileToStorage(singleFile);
            if (operationStatus)
                await saveImageData(singleFile.name);

        }));

        res.status(200).send({ message: 'File uploaded!', status: true });

    } catch (err) {
        return res.status(400).send({ err:err, status: false });
    }

    async function insertFileToStorage(singleFile) {
        try {
            let insertFilePromise = new Promise((resolve, reject) => {
                singleFile.mv(`${absolutePath}/${singleFile.name}`, async function (err) {
                    if (err) {
                        logger.error(err);
                        reject(false);
                        return console.error(err);
                    }
                    console.log('File uploaded!');
                    resolve(true);
                });
            });

            return insertFilePromise;
        } catch (err) {
            return res.status(400).send({ err:err, status: false });
        }
    }

    async function saveImageData(img_name) {
        try {
            let newFile = new fileData();
            newFile.image_name = img_name;
            newFile.abs_image_path = `${absolutePath}/${img_name}`;
            newFile.rel_image_path = `assets/${img_name}`;
            newFile.save(function (err, data) {
                if (err) {
                    logger.error(err);
                    return console.log(err)
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ err:err, status: false });
        }
    }
});

/* get file data */
router.get('/file', async function (req, res, next) {
    try {
        var findData = {};

        if (req.query.hasOwnProperty('id')) {
            findData = {
                _id: req.query.id.toObjectId()
            }
        }
        
        fileData.find(findData, function (err, data) {
            if (err) {
                console.error(err);
                logger.error(err);
                return res.status(400).send({ error: err, status: false });
            }
            if (data.length == 0)
                return res.status(400).send({ message: 'No images found!', status: false });

            res.status(200).send({ message: 'Images found successfully', status: true, data: data });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err:err, status: false });
    }
});


router.delete('/file', async function (req, res, next) {

    let queryData = req.query;

    req.check('id', 'id is required field!').notEmpty();

    let errors = await req.validationErrors();

    if (errors) {
        return res.status(400).send({ message: await commonCntr.returnErrorMessage(errors), status: false });
    }

    let findData = {
        _id: queryData.id.toObjectId()
    };

    try {
        fileData.findByIdAndRemove(findData, function (err, data) {
            if (err) {
                console.error(err);
                logger.error(err);
                return res.status(400).send({ error: err, status: false });
            }

            if (data == null)
                return res.status(400).send({ message: 'No image with this id found!', status: false });

            fs.unlinkSync(data.abs_image_path);
            res.status(200).send({ message: 'Image deleteed suscessfully!', status: true });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err:err, status: false });
    }
});

module.exports = router; 
