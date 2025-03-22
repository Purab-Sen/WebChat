import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import grid from "gridfs-stream";


configDotenv();
const serverUrl = process.env.SERVER_URL;


let gfs,gridFsBucket,gfsPhotos, gridFsBucketPhotos;
const conn = mongoose.connection;

conn.once('open',()=>{
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gridFsBucketPhotos = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'photos'
    });
    gfs = grid(conn.db,mongoose.mongo); 
    gfs.collection('fs');
    gfsPhotos = grid(conn.db,mongoose.mongo);
    gfsPhotos.collection('photos');
})

export const uploadFile = (req,res)=>{
    if(!req.file){
        return res.status(500).json('File not found');
    }
    const imageUrl = `${serverUrl}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
}

export const getImage = async(req,res)=>{
    try{
        const extension = req.params.filename.split('.').pop();
        const imageExtentions = ["png","jpg","jpeg"];
        let readStream;
        if(!imageExtentions.includes(extension)){
            const file = await gfs.files.findOne({filename: req.params.filename})
            readStream = gridFsBucket.openDownloadStream(file._id);
        }else{
            const file = await gfsPhotos.files.findOne({filename: req.params.filename})
            readStream = gridFsBucketPhotos.openDownloadStream(file._id);
        }
        readStream.pipe(res);
    }catch(err){
        return res.status(500).json(err.message);
    }
}