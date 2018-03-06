var fs=require('fs');
exports.getAllAlbums=function(callback){
	
	fs.readdir('./uploads',function(err,files){
		  if(err){
            callback("没有找到uploads文件",null);
       };
		var albums=[];
		(function iterator(i){
			if(i==files.length){
				callback(null,albums);
				return;
			}
			fs.stat("./uploads/" + files[i],function(err,stats){
				if(err){
                    callback("找不到文件" + files[i] , null);
                }
				if(stats.isDirectory()){
					albums.push(files[i]);
				}
				iterator(i+1);
			});
		})(0);
	});
}

exports.getAllImagesByAlbumName=function(albumName,callback){
	fs.readdir('./uploads/'+albumName,function(err,files){
		  if(err){
            callback("没有找到uploads文件",null);
            return;
       };
		var allimages=[];
		(function iterator(i){
			if(i==files.length){
				callback(null,allimages);
				return;
			}
			fs.stat("./uploads/" +albumName+'/' +files[i],function(err,stats){
				if(err){
                    callback("找不到文件" + files[i] , null);
                }
				if(stats.isFile()){
					allimages.push(files[i]);
				}
				iterator(i+1);
			});
		})(0);
	});
	
}
