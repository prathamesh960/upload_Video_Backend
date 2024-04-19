const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

const app = express();

mongoose.connect('mongodb://localhost:27017/uploadproject')

app.use(cors());
const mediaRoutes = require('./routes/media');

app.use('/api/vl/media', mediaRoutes);
app.use('/public', express.static(path.join(__dirname,'public')))
const mongodbUri = "mongodb://localhost:27017/uploadproject";

mongoose.connect(mongodbUri ,{
    useNewUrlParser:true,
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb');
});

// mongoose.Connection.on('error' ,(err)=>{
//     console.log('Error connecting to mongo',err);
// });

app.listen(4000 ,()=>{
    console.log("App is runinng on PORT 4000");
});
