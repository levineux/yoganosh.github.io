(function() {
  function displaySearchResults(results, store, searchTerm) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<article> \
          <div class="row"> \
          <div class="col-sm-4 col-xs-12"> \
          <figure> \
          <a href="' + item.url + '"><img src="/images/placeholder-thumb.png" data-src="/images/' + item.image + '" class="lazyload block" alt="' + item.imageTitle + '"></a> \
          </figure> \
          </div> \
          <div class="col-sm-5 col-xs-12"> \
          <a class="tag ' + item.color + '" href="/category/' + item.category + '">' + item.category + '</a> \
          <div class="date"><time datetime="' + item.date + '"></time></div> \
          <div class="clearfix"></div> \
          <header> \
          <h2><a href="' + item.url + '">' + item.title + '</a></h2> \
          </header> \
          <p>' + item.content.substring(0, 150) + '...</p> \
          <div class="author hidden-xs">by <a href="#">' + item.author +'</a></div> \
          </div> \
          </div> \
          </article>';
      }

      searchResults.innerHTML = appendString;
      document.getElementsByClassName('search-results-title')[0].style.display = 'block';
      document.getElementsByClassName('search-results-title')[0].innerHTML = 'Search Results for: ' + searchTerm;

    } else {
      document.getElementsByClassName('search-results-title')[0].innerHTML = 'No results found';
      document.getElementsByClassName('search-results-title')[0].style.display = 'block';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('s');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store, searchTerm); // We'll write this in the next section
    }
  }
})();