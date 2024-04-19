const Media = require('../models/media')


exports.getAll = async (req,res)=>{
    try{
        const media = await Media.find();
        res.json(media);
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
};

exports.create = async (req,res)=>{
    const {name} = req.body;
    let videosPaths = [];

   if(Array.isArray( req.files.videos) && req.files.videos.length>0){

    for(let video of req.files.videos){
        videosPaths.push('/' + video.path);
    }
   }

   try{
        const createMedia = await Media.create({
            name,
            videos:videosPaths
        })
        res.json({message:'Media create successfully ',createMedia})
   }catch(error){
        console.log(error);
        res.status(400).json(error);
   }
}