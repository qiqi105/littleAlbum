const express=require('express');
const app=express();
app.listen(8082);
var router=require('./controller/router.js');
//设置模板引擎  
const ejs = require("ejs").__express;
app.set("view engine", "ejs");  
app.engine('.ejs', ejs);
//路由中间件
app.use('/public',express.static('./public'));
app.use('/uploads',express.static('./uploads'));
app.get('/',router.showIndex);
app.get('/up',router.showUp);
app.post('/up',router.doPost);
app.get('/:albumName',router.showAlbum);
//404
app.use(function(req,res){
	res.render('err');
});
