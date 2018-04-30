const connect = require('./../connect');

let bookshelf = require('bookshelf');
bookshelf = bookshelf(connect());

var knex = require('knex');


const Post = bookshelf.Model.extend({
	tableName: 'posts',
	idAttribute: 'PostID'
});

module.exports = Post;