//Idea: create an app that will compile an html ready table after user slelects number of rows and columns
//Global variables
//Express will handle front end development
var fs = require('fs'),
	express = require('express'),
	app = express(),
	cons = require('consolidate');

//Express set up
	app.engine('html', cons.swig);
	app.set('view engine', 'html'); 
	app.set('views', __dirname + "/views");
	app.use(express.bodyParser());
	app.use(app.router);

//Handle any errors
	function errorHandler(err, req, res, next) {
		console.error(err.message);
		console.error(err.stack);
		res.status(500);
		res.render('error_template', { error:err });
		}

//Server set up for first page, which will call form for selecting rows and columns
	app.get('/', function (req, res, next){
			res.render('tablestart');
			console.log('Start page enabled');
	});

//Talbemaker page, will take form valuesand creat table from them
	app.post('/table', function (req, res, next) {
		//A bunch of writing stuff, until I can get Express to pass an array completly
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">');
	res.write('<div class="container">');
	res.write('<h3>Your Table</h3>');
	res.write('<pre>');
		console.log('Tablemaker script starting');
		//variables from form
			var rows = req.body.rowcount,
			columns = req.body.columncount,
			cellpadding = req.body.cellpadding,
			tableclass = req.body.tableclass;
			console.log('Rows: ' + rows + ', Columns: ' + columns);
			//Adding the first table elements
			if (tableclass !== "" && cellpadding > 0) {
				res.write('&lt;table class=&quot;' + tableclass + '&quot; cellpadding=&quot;' + cellpadding + '&quot;&gt;<br />');
			 } else  if (tableclass !== "" && cellpadding == 0) {
				res.write('&lt;table class=&quot;' + tableclass + '&quot;&gt;<br />');
			} else if (tableclass == "" && cellpadding > 0) {
				res.write('&lt;table cellpadding=&quot;' + cellpadding + '&quot;&gt;<br />');
			} else {
				res.write('&lt;table&gt;<br />');
			}
			console.log('<table> added to array');
			for (var r = 1; r <= rows; r++) {
				res.write(' &lt;tr&gt;<br />');
				console.log('Row ' + r + ' added');
				for (var c = 1; c <= columns; c++ ) {
					res.write('  &lt;td&gt;Row ' + r + ', Column ' + c + '&lt;&#47;td&gt;<br />');
					console.log('Column ' + c + ' added');
				}
				res.write(' &lt;&#47;tr&gt;<br />');
			}
			//ending table tag
			res.write('&lt;&#47;table&gt;');
			res.write("</pre>");
			res.write("<form action='/' method='GET' role='form'>");
			res.write("<input type='Submit' class='btn btn-primary btn-lg' value='Let Us Make Another' />");
			res.write("</form>");
			res.write("</div>");
			console.log('Table Complete');
			res.end();
	});

//start app
app.listen(3000);
console.log('Tablemaker running');