"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var library = new Library();

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Index
app.get('/books', function(req, res){
  //DONE!
  console.log("/BOOKS")
  //the caller of library defines the buzzer
  library.all(function(leBooks){
      res.render('library/index', {allBooks: leBooks});
  });
});

//New COMPLETE
app.get('/books/new', function(req, res){
  //DONE
  library.all(function(leBooks){
  	res.render("library/new");
  });  
});

//Create COMPLETE
app.post('/books', function(req, res) {
  // console.log(req.body.book.title);
  //^^ TEST for location of the title within the object
  library.add(req.body.book.title, req.body.book.author, function() {
    res.redirect('/books'); 
    //^^redirect to books page ^^
  });  
});


//Show TODO
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  // console.log("/books -> Implement me.");
    // console.log()
  // Add library/show.ejs page and render it with found book
  // Add "Show" link on '/books' page.
  res.render('./library/show');
  // });
});


//Edit WIP
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  //TODO
  // console.log("/books/:id/edit -> Implement me.");
  library.findById(id, function(x){
    var foundBook = x;

    res.render('library/edit', {book: foundBook});
    // console.log({book:foundBook});
  });
});

//Update TODO
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  // console.log("/books/:id -> Implement me.");
  // library.update(id, title, author, function(){
  // });
  res.redirect('/books');
});


//Delete COMPLETE
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  library.destroy(id, function(){
  });
  res.redirect('/books');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});