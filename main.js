// API KEY: 6398dbc8f7414ecda15b0e5529b57f12
let container = document.getElementById("news-container");
let numResults = document.getElementById("number-results");



topHeadlines()
document.getElementById('search-button').addEventListener('click', searchNews);

document.getElementById('top').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
});
document.getElementById('business').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/everything?' +
          'q=' + 'Business' + '&' +
          'sortBy=popularity&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
})
document.getElementById('technology').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/everything?' +
          'q=' + 'Technology' + '&' +
          'sortBy=popularity&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
})
document.getElementById('entertainment').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/everything?' +
          'q=' + 'Entertainment' + '&' +
          'sortBy=popularity&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
})
document.getElementById('sports').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/everything?' +
          'q=' + 'Sports' + '&' +
          'sortBy=popularity&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
})
document.getElementById('science').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/everything?' +
          'q=' + 'Science' + '&' +
          'sortBy=popularity&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
})
document.getElementById('health').addEventListener('click', function(){
    let url = 'https://newsapi.org/v2/everything?' +
          'q=' + 'Health' + '&' +
          'sortBy=popularity&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
    httpRequestGet(url);
})

function httpRequestGet(url){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let news = JSON.parse(this.responseText);
            console.log(news);
    
            numResults.innerText = news.totalResults;
            clearNews();
            for(let i = 0; i < news.articles.length; i++){
    
                
                createNewsItem(news.articles[i]);
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function topHeadlines(){
    let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=6398dbc8f7414ecda15b0e5529b57f12';

    httpRequestGet(url);
}

function searchNews(){
    let keyword = document.getElementById('keyword').value   
    let source = document.getElementById('sources').value

    let newKeyword = keyword.replace(/ /g,"-");
    let newSource  = source.replace(/ /g,"-");

    let newUrl; 

    if(newKeyword == "" && newSource ==""){
        topHeadlines();
    }else if(newKeyword != "" && newSource != ""){
        newUrl = 'https://newsapi.org/v2/top-headlines?' +
        'sources=' + newSource +'&' +
        'q=' + newKeyword + '&' +
        'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
        httpRequestGet(newUrl);
    } else if(newKeyword != ""){
        newUrl = 'https://newsapi.org/v2/everything?' +
          'q=' + newKeyword + '&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';

          httpRequestGet(newUrl);
    } else if(newSource != ""){
        newUrl = 'https://newsapi.org/v2/top-headlines?' +
          'sources=' + newSource +'&' +
          'apiKey=6398dbc8f7414ecda15b0e5529b57f12';
          httpRequestGet(newUrl);
    }
}

function createNewsItem(input){
    let newsElement = document.createElement('div');

    // NEWS IMAGE
    let newsImage = document.createElement('img');
    let urlToImage = input.urlToImage
    if(urlToImage === null){
        urlToImage = 'media/fillerImage.jpg'
    }
    newsImage.src = urlToImage
    newsElement.appendChild(newsImage)

    // NEWS TITLE
    let newsLink = document.createElement('a');
    newsLink.href = input.url;

    let newsTitle = document.createElement('h3');
    newsTitle.innerText = input.title;
    newsLink.appendChild(newsTitle);

    newsElement.appendChild(newsLink);

    // NEWS AUTHOR
    let newsBy = document.createElement('h6');
    let author = input.author
    if(author === null){
        author = 'UNKNOWN'
    }
    newsBy.innerText = "By " + author;
    newsElement.appendChild(newsBy);

    // NEWS DESCRIPTION
    let newsDescription = document.createElement('p');
    newsDescription.innerText = input.description;
    newsElement.appendChild(newsDescription);

    container.appendChild(newsElement);
}

function clearNews(){
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
}