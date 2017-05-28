var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.get('/articles/', function (req, res) {
	var obj = JSON.parse(fs.readFileSync('./DB/articles.json', 'utf8'));
   res.json(obj);
});
app.post('/articles', function (req, res) {
	fs.writeFile('./DB/articles.json', JSON.stringify(req.body), function(err){
    	if(err) throw err;
   	})
 // console.log(JSON.stringify(req.body));
  res.send('articles written');
});
app.put('/articles/', function (req, res) {
  	res.send('Got a PUT request ');
});
app.delete('/', function (req, res) {
  res.send('Got a DELETE request ');
});
