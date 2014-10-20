"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function Library() {

}

// COMPLETE
Library.prototype.all = function(buzzer) {
	var allBooks = [];
	//collect all the books we get back to this array
 db.query("SELECT * FROM books;", [], function(err, resultSet){
    if (err) console.log("QUERY FAILED", err);
    resultSet.rows.forEach(function(row){
    	var aBook = new Book(row.title, row.author, row.id);
 			allBooks.push(aBook);
    });
    // console.log(allBooks);
    buzzer(allBooks);
    //once we have all the books buzzer goes back to library with them.
	});
};

// COMPLETE
Library.prototype.add = function(title, author, buzzer) {

 	db.query("INSERT INTO books (title, author) VALUES ($1, $2);", [title,author], function(err, resultSet){
    if (err) console.log("INSERT FAILED", err);
    // console.log("resultSet.rows");
  //^^ console.log isn't logging anything
	// call buzzer with the new book
	buzzer();
	});
};

// COMPLETE
Library.prototype.destroy = function(id, buzzer) {
	// TODO
	// db.query... DELETE
	db.query("DELETE FROM books WHERE id = $1;", [id], function(err, resultSet){
		if (err) console.log("DELETE FAILED", err);
		// console.log(id); test
		console.log(resultSet);
	});
	buzzer();
	// call buzzer without params when done
};

// TODO
Library.prototype.update = function(id, title, author, buzzer) {
	// db.query("UPDATE books (id, title, author) VALUES ($1, $2, $3) ;", [id,title,author], function(err, resultSet){


	// });
	// call buzzer without params when done
	buzzer();
};

// DONE
Library.prototype.findById = function(id, buzzer) {
	var foundBook = {};
	db.query("SELECT * FROM books WHERE id = $1;", [id], function(err, resultSet){
		// console.log(resultSet.rows[0].title);
		var foundBook = new Book (
			resultSet.rows[0].title,
			resultSet.rows[0].author,
			resultSet.rows[0].id);
			console.log("things are happening" + foundBook);
		buzzer(foundBook);
	});
	// call buzzer with the book found
};

module.exports = Library;
