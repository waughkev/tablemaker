//Idea: create an app that will compile an html ready table after user slelects number of rows and columns
//Global variables
//Express will handle front end development
var express = require('express'),
	app = express(),
	cons = require('consolidate'),

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
	});

//Talbemaker page, will take form valuesand creat table from them
	app.post('/your_table', function (req, res, next) {
		//variables from form
		var rows = req.body.rows,
			columns = req.body.columns;

		//Conditional statement to  send error if either value is not filled in
		if (rows = '' || columns='') {
			next(Error('Fill in the columns dummy'));
		}
		//else statement will call function to create table
		else {
			//declaring table array
			var tablearray = new Array[];
			//Adding the first table elements
			tablearray.push('<table>');
			for (var r = 0; x < rows; x++) {
				tablearray.push('	<tr>');
				for (var c = 0; c < columns; x++ ) {
					tablearray.push('		<td>Row[r], Column[c]</td>');
				}
				tablearray.push(' </tr>');
			}
			//ending table tag
			tablearray.push('</table>');
			//output table in easy to copy and paste format
			tablearray.toString();
			//while (i < tablearray.length, i++) {
//
//			}
		}
	}):

//start app
app.listen(3000);
console.log('Tablemaker running');