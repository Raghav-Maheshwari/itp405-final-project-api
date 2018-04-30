var express = require('express');
var knex = require('knex');


//create new app
var app = express();

const Post = require('./models/Post');

//The get methods:
app.get('/posts', function(request, response) {
	//returns a promise:
	Post.fetchAll().then(function(posts) {
		response.json(posts);
	});
});

app.get('/posts/:id', function(request, response) {
	let id = request.params.id;
	let post = new Post({ PostID: id});

	//returns a promise:
	post.fetch().then(function(post) {
		if (!post) {
			throw new Error();
		} else {
			response.json(post);
		}
	})
	//catch the error
	.catch(function() {
		response.status(404).json({
			error: `Post ${id} not found`
		});
	});
});

//The post method:
app.post('/posts', function(request, response) {
	let userID = request.body.userID;
	let foodItem = request.body.foodItem;
	let location = request.body.location;
	let description = request.body.description;

	try {
		if (!userID || !foodItem || !location || !description) {
			throw new Error('Missing attributes');
		}

		let post = new Post({UserID: userID, FoodItem: foodItem, Location: location, Description: description});

		post.save().then(function (newPost) {
			console.log("Successfully added new post");
		});
	} catch (error) {
		response.status(422).json({
			error: error.message
		});
	}
});

//The delete method:
app.delete('/posts/:id', function(request, response) {
	let id = request.params.id;
	let post = new Post({ PostID: id});

	post.destroy().then(function(post) {
		if (post) {
			response.status(204).send();
		}
	}).catch(function(error) {
		response.status(404).json({
			error: `Post ${id} not found`
		});
	});
}); 



function connect() {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: './database.sqlite'
		}
	});

	return connection;

}

const port = process.env.PORT || 9000;

app.listen(port, function() {
	console.log(`Listening on port ${9000}`);

});