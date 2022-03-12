//jshint esversion:6
// activate
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
// const
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// Create box for blogposts
let blogposts = [];

// set EJS
app.set('view engine', 'ejs');
// Use body-parser + json and Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// home page + blogposts
app.get('/',function(req,res) {
  res.render('home.ejs', {
    blogposts: blogposts,
    blogText: homeStartingContent
  });
// The value of myTruncatedString is "ABC"
});
// about page && about content
app.get('/about',function(req,res){
  res.render('about.ejs', {
    aboutText: aboutContent
  });
});
// Contact page && contact content const
app.get('/contact',function(req,res){
  res.render('contact.ejs', {
    contactText: contactContent
  });
});
// Compose page for making blogposts.
app.get('/compose',function(req,res){
  res.render('compose.ejs');
});
// Creating a /posts with a second route the post name
app.get('/posts/:postName', function(req,res){

  const requestedTitle = _.lowerCase(req.params.postName);

  blogposts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
//  if stored title is equal to the typed in title render post.ejs with post.title and post.content
    if ( storedTitle === requestedTitle ){
      console.log('we have a match!');
      res.render('post.ejs', {
        title: post.title,
        content: post.content
      })
      // res.redirect('/posts/' + storedTitle);
    } else {
      console.log('No match Sorry')
    }
  })
});

// Post title and content recieved from newTitle % newContent input html
app.post('/compose',function(req,res){

  const post = {
    title: req.body.newTitle,
    content: req.body.newContent
  };
// Push post as above intro the const blogposts
  blogposts.push(post);
// redirect this to the home page
  res.redirect('/');
});










app.listen(3008, function() {
  console.log("Server started on port 3008");
});
