document.addEventListener('DOMContentLoaded', function() {
  /**
   * Search
   */
  var inputs = document.querySelectorAll('.search');
  var resultsEl = document.querySelector('.search-results');

  for (var i = 0; i < inputs.length; i++) {
    search = new Search({
      el: inputs[i],
      url: inputs[i].getAttribute('rel'),
      resultsEl: resultsEl
    });
  }
});
