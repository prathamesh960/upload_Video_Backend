const express = require('express');
const mediaController = require('../controller/mediaController')
const multer = require('multer');
const fs = require('fs');
const path = require('path')
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         if(!fs.existsSync('public')){
//             fs.mkdirSync('public');
//         }

//         if(!fs.existsSync('public/videos')){
//             fs.mkdirSync('public/videos')
//         }

//         cb(null,"public/videos");
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()= file.originalname);
//     },
// });


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync('public')) {
            fs.mkdirSync('public');
        }

        if (!fs.existsSync('public/videos')) {
            fs.mkdirSync('public/videos')
        }

        cb(null, "public/videos");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // corrected the concatenation operator
    },
});

const upload = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        var ext = path.extname(file.originalname);

        if(ext !== '.mkv' && ext !== '.mp4'){
            return cb(new Error('Only videos are allowed!'))
        }

        cb(null , true );
    }
});

const route = express.Router();

// get all media
route.get('/all' , mediaController.getAll);

// post create new media
route.post('/create',upload.fields([
    {
        name:'videos',
        maxCount:5
    }
]),mediaController.create)

module.exports = route;
