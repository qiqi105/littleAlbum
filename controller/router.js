var files=require('../models/files.js');
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
exports.showIndex=function(req,res,next){
	files.getAllAlbums(function(err,albums){
		if(err){
			next();
			return;
		}
				res.render('index',{
				"albums":albums
			});
	});
	
}
exports.showAlbum=function(req,res,next){
	var albumName=req.params.albumName;
	
	files.getAllImagesByAlbumName(albumName,function(err,imagesArray){
		if(err){
			next();
			return;
		}
				res.render('album',{
					'albumName':albumName,
					'images':imagesArray
				});
	})
	
}

exports.showUp=function(req,res,next){
	files.getAllAlbums(function(err,albums){
		if(err){
			next();
			return;
		}
				res.render('up',{
				"albums":albums
			});
	});
}


exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempup/");
      form.parse(req, function(err, fields, files,next) {
      	var oldPath=files.picture.path;
      	var newPath=path.normalize(__dirname + "/../uploads/"+fields.folder+'/'+files.picture.name);
		        console.log(fields);
		        console.log(files);
		        if(err){
		            next();    
		            return;
		        }
		        //判断文件尺寸
		        var size = parseInt(files.picture.size);
		        if(size > 500){
		            res.send("图片尺寸应该小于500k");
		            //删除图片
		            fs.unlink(files.picture.path);
		            return;
		        }
				fs.rename(oldPath,newPath,function(err){
					if(err){
						console.log('失败了');
					}
					console.log(newPath);
				});
        res.send('ok');
      });
   }