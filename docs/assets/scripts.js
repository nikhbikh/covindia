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

function card(item) {
  html = '<div class="card">'
  if (item.url) {
    html += `<a  href="${ item.url }">`
  } else {
    html += '<a>'
  }
  html += '<div class="label">'
  if (item.label1) {
    html += `<span>${ item.label1 }</span>`
    if (item.label2) {
      html += `<span>${ item.label2 }</span>`
    }
  }
  html += `
</div>
<div class="body">
<h1>${ item.name }</h1>
<p>${ item.text }</p>
</div>
</a>
</div>`;
  return html;
}
