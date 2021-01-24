const { request } = require('express');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.get('/',(req,res)=>{
	res.status(200).send("<h6>meow</h6>");
})
app.post('/',(req,res)=>{
	console.log(req.body);
	res.status(200).send("meow");
})

app.listen(port,()=>{
	console.log('kuch bhi kuch bhi');
})

