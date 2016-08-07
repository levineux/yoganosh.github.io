(function() {
  function displaySearchResults(results, store, searchTerm) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<article style="display:none;"> \
          <div class="row"> \
          <div class="col-sm-4 col-xs-12"> \
          <figure> \
          <a href="' + item.url + '"><img src="/images/placeholder-thumb.png" data-src="' + item.image + '" class="lazyload block" alt="' + item.imageTitle + '"></a> \
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

    postsSize = $(".content article").size();
    var pageNum = window.location.hash.substr(1);
    x=10;
    if (pageNum > 0) x=x*pageNum;
    $('.content article:lt('+x+')').show();
    if (x >= postsSize) $('#loadMore').hide();
    $('#loadMore').click(function (e) {
      e.preventDefault;
      x= (x+5 <= postsSize) ? x+5 : postsSize;
      $('.content article:lt('+x+')').show();
      if(x == postsSize) {
        $('#loadMore').hide();
      } else {
        if (pageNum == "") {
          pageNum = 2;
        } else {
          pageNum += 1;
        }
        this.setAttribute('href', "#" + pageNum);
      }
    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }
})();