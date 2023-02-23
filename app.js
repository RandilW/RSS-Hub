// Get the RSS feed URL
const rssFeedUrlFull = "http://www.newyorker.com/feed/news";
const rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrlFull)}`;
fetchRssFeed(rssFeedUrl);

var addButton = document.querySelector('#add-button');
var rssForm = document.querySelector('#rss-form');

rssForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var rssInput = document.querySelector('#rss-input');
    var url = rssInput.value;
    var rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
    console.log(rssFeedUrl)
    fetchRssFeed(rssFeedUrl);
    rssInput.value = '';
});

addButton.addEventListener('click', function (event) {
    event.preventDefault();
    var rssInput = document.querySelector('#rss-input');
    var url = rssInput.value;
    var rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
    console.log(rssFeedUrl)
    fetchRssFeed(rssFeedUrl);
    rssInput.value = '';
});


// Get the articles div
const articlesDiv = document.getElementById("articles");

// Display the loading indicator
articlesDiv.innerHTML = "<h2><span class='loader'></span>Loading articles...</h2>";

// Fetch the RSS feed
console.log('Fetching RSS feed...');
function fetchRssFeed(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            console.log(items)

            // Create HTML for each item
            let html = "";
            items.forEach(item => {
                const image = item.thumbnail;
                const title = item.title;
                console.log(title)
                const link = item.link;
                console.log(link)
                const description = item.description;
                console.log(description)

                html += `
        <div class="article">
          <h3><a href="${link}" target="_blank">${title}</a></h3>
          <img src="${image}"width="25%">
          <p>${description}</p>
          <a href="${link}" target="_blank" class="btn a">Read more</a>
        </div>
      `;
            });

            // Display the articles
            console.log(html)
            articlesDiv.innerHTML = html;

        })
        .catch(error => {
            // Display an error message
            articlesDiv.innerHTML = "<h2>Failed to load articles</h2>";
            console.error(error);
        });
}