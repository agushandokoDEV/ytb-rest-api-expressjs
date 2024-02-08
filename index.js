require('dotenv').config();

const http = require('http');
const app = require('./app');
const server  = http.createServer(app);

//console.log(server.listen(port));
server.listen(process.env.PORT || 3000,function(){
	//if(err) throw err;
	console.log(`Sever is running PORT :${process.env.PORT}/`);
});