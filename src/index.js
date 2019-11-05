(function() {
    var search = "Trump";
    
    document.getElementById("button").addEventListener("click", function(){
        search = document.getElementById("input").value;
        newsAPI();
    });
    
    async function newsAPI() {
        var response = await fetch("https://newsapi.org/v2/everything?language=en&q="+search+"&apiKey=6cf8ac8dfd324e3ba413c179ad75ea8f");
        var news = await response.json();
        console.log(news.articles);
        document.getElementById("urlToImage").src = news.articles[0].urlToImage;
        document.getElementById("title").innerHTML = news.articles[0].title;
        document.getElementById("author").innerHTML = news.articles[0].author;
        document.getElementById("description").innerHTML = news.articles[0].description;
        document.getElementById("content").innerHTML = news.articles[0].content;
      }
    
    newsAPI();
 })();