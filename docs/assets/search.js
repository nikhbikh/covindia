---
---
/**
 * Search
 */

// Constructor
var Search = function(params) {
  this.el = params.el;
  if (params.resultsEl) {
    this.resultsEl = params.resultsEl;
  }
  else {
    this.resultsEl = document.createElement('div');
    this.resultsEl.classList.add('search-results');
    this.resultsEl.innerHTML = '<p class="default">Type in keywords</p>';
    this.el.after(this.resultsEl);
  }
  this.url = params.url;
  this.idx = null;
  this.content = [];
  this.items = [];
  this.results = [];
  this.init();
}

// Fetch the content, build the search index and listen to input changes
Search.prototype.init = function() {
  var that = this;
  var request = new XMLHttpRequest();
  request.open('GET', this.url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      that.content = JSON.parse(request.responseText); // Content retrieved
      that.index(); // Build the index

      // We attach search to the changes of input
      that.el.addEventListener('keyup', function () {
        if (this.value) {
          console.log(`searching ${this.value}...`);
          that.search(this.value);
          console.log(`displaying ${this.value}...`);
          that.display();
        }
        else {
          hideResults();
        }
      });
    }
    else {
      console.log('(Search) Error: couldn\'t retrieve content.');
    }
  };
  request.onerror = function() {
    console.log('(Search) Error: couldn\'t retrieve content.');
  };
  request.send();
}

// Create the Lunr.js index
Search.prototype.index = function() {
  var that = this;
  this.idx = lunr(function () {
    this.ref('id');
    this.field('url');
    this.field('name', { boost: 10 });
    this.field('label1');
    this.field('label2');
    this.field('text');

    // Add the data to lunr
    for (var i = 0; i < that.content.length; i++) {
      this.add(that.content[i]);
      that.items[that.content[i].id] = that.content[i];
    }
  });
}

// Display results
Search.prototype.display = function() {
  if (this.results.length) {
    showResults();

    var output = '<div class="wrapper"><br/>';
    for (var i = 0; i < this.results.length; i++) {
      var item = this.items[this.results[i].ref];
      output += card(item)
    }
    output += '</div>';
    this.resultsEl.innerHTML = output;
  }
  else {
    showResults();
    console.log('no results found');
    this.resultsEl.innerHTML = '<p class="empty">No results found</p></li>';
  }
}

// Run the search with Lunr.js
Search.prototype.search = function(keywords) {
  this.results = this.idx.search(keywords);
}

function showResults() {
  contents = document.querySelector('.page-content')
  contents.style.display = "none";

  results = document.querySelector('.search-results')
  results.style.display = "block";
}

function hideResults() {
  contents = document.querySelector('.page-content')
  contents.style.display = "block";

  results = document.querySelector('.search-results');
  results.style.display = "none";
}
