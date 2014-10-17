"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

db.query("SELECT * FROM books;", function(err, resultSet){
    if (err) console.log("SELECT FAILED :-(", err);
    console.log(resultSet.rows);
});

db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
["The Great Gatsby", "Fitzgerald"], function(err, resultSet){
  if (err) console.log("INSERT FAILED :-(", err);
  console.log(resultSet.rows);

 db.query("UPDATE books SET author = 'Taco' WHERE author = 'Grass';", function(err, resultSet){
  if (err) console.log("INSERT FAILED :-(", err);
  console.log(resultSet.rows);

db.query("DELETE FROM books WHERE title = 'The Great Gatsby';", function(err, resultSet){
  if (err) console.log("INSERT FAILED :-(", err);
  console.log(resultSet.rows);

});

db.end();
