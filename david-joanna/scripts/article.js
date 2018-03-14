'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its
//name capitalized? Explain the context of "this" within the function.
//What does "rawDataObj" represent?
// To write a consutrctor  function we use capital letter.
//The constructor function serves to take the raw data from
//the array and pass it back through to collect the informations
// into the articles array. This represents individula properties for each article.
//RawDataObj is a parameter of the constructor and it serves to pass an individual
//article and its properties into the array.

function Article (rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;

}

Article.prototype.toHtml = function() {
  console.log('anything');
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning the article allows us dynamically update the template and saves us from copying and pasting the properties into the HTML.

  let $newArticle = $('article.template').clone()

  $newArticle.removeClass('template');
  if (!this.publishedOn){
    $newArticle.addClass('draft');}
  $newArticle.attr('data-category', this.category);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('a').html(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('time').html(this.publishedOn);
  $newArticle.find('.article-body').html(this.body);



  // // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});



rawData.forEach(function(rawDataObj) {
  articles.push(new Article(rawDataObj))
});

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});


