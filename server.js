
var fs = require('fs'),
	express = require('express'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/videomanager');
var Schema = mongoose.Schema;

var Movies = mongoose.model('Movies', new Schema({
	title: String,
	year: Number,
	genre: Number,
	cover: String
}));

var Dvds = mongoose.model('Dvds', new Schema({
	movieId: String,
	userId: String,
	rented: Boolean
}));

var Users = mongoose.model('Users', new Schema({
	firstName: String,
	lastName: String,
	email: String
}));

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 8080);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'assets')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('/', function (req, res) {
	fs.readFile('index.html', 'utf8', function (err, text) {
		res.send(text);
	});
});


//users - Get
app.get('/users', function (req, res) {
	var query = Users.find()
	query.exec(function (err, docs) {
		if (!err) {
			res.send(docs);
		}
	});
});
//users - Insert
app.post('/users', function (req, res) {
	var doc = new Users(req.body);
	doc.save(function (err, doc) {
		if (err) {
			res.send('{"success":false}');
		} else {
			res.send(doc);
		}
	});
});
//user (1) - Get
app.get('/users/:id', function (req, res) {
	Users.findById(req.params.id, function (err, doc) {
		if (err) {
			res.send('{"success":false}');
		} else {
			res.send(doc);
		}
	});
});
//user (1) - Modify
app.put('/users/:id', function (req, res) {
	Users.findById(req.params.id, function (err, doc) {
		if (err) {
			res.status(404).send('{"success":false}');
		} else {
			for (var param in req.body) {
				if (param !== '_id') {
					doc[param] = req.body[param];
				}
				doc.save(function (err, doc) {
					if (err) {
						res.status(403).send('{"success":false}');
					} else {
						res.send(doc);
					}
				});
			}
			res.send(doc);
		}
	});
});
//user - Delete
app.delete('/users/:id', function (req, res) {
	Users.remove({_id: req.params.id}, function (err) {
		if (err) {
			res.status(404).send('{"success":false}');
		} else {
			res.send('{"success":true}');
		}
	});
});

//movie - Get
app.get('/movies', function (req, res) {
	var query = Movies.find()
	query.exec(function (err, docs) {
		if (!err) {
			res.send(docs);
		}
	});
});
//Movies - Insert
app.post('/movies', function (req, res) {
	var doc = new Movies(req.body);
	doc.save(function (err, doc) {
		if (err) {
			res.send('{"success":false}');
		} else {
			res.send(doc);
		}
	});
});
//movie (1) - Get
app.get('/movies/:id', function (req, res) {
	Movies.findById(req.params.id, function (err, doc) {
		if (err) {
			res.send('{"success":false}');
		} else {
			res.send(doc);
		}
	});
});
//movie (1) - Modify
app.put('/movies/:id', function (req, res) {
	Movies.findById(req.params.id, function (err, doc) {
		if (err) {
			res.status(404).send('{"success":false}');
		} else {
			for (var param in req.body) {
				if (param !== '_id') {
					doc[param] = req.body[param];
				}
				doc.save(function (err, doc) {
					if (err) {
						res.status(403).send('{"success":false}');
					} else {
						res.send(doc);
					}
				});
			}
			res.send(doc);
		}
	});
});
//movie - Delete
app.delete('/movies/:id', function (req, res) {
	Movies.remove({_id: req.params.id}, function (err) {
		if (err) {
			res.status(404).send('{"success":false}');
		} else {
			res.send('{"success":true}');
		}
	});
});
//Dvds
app.get('/users/:id/rented', function (req, res) {
	var rentedMovies = [];
	var filter = {
		userId : req.params.id,
		rented : true
	};
	var query = Dvds.find(filter);
	query.exec(function (err, docs) {
		var userInfo;
		if (!err) {

			Users.findById(req.params.id, function (err, doc) {
				userInfo = doc;
			});

			for (var i = docs.length.length - 1; i >= 0; i--) {
				var objDoc = JSON.parse(JSON.stringify(docs[i]));
				Movies.findById(objDoc.movieId, function (err, doc) {
					var rentedMovie = doc;
					rentedMovie._id = doc._id;
					console.log('rentedMovie')
					rentedMovies.push(rentedMovie);
				});
			};

			res.send({
				user: userInfo,
				rentedMovies: rentedMovies
			});
		}
	});
});


http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});


/*var server = restify.createServer();
server.use(restify.bodyParser());
*/
