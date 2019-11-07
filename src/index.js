(function() {
  let input = document.getElementById("input"),
    button = document.getElementById("button"),
    search = "",
    response = {},
    image = document.getElementById("urlToImage"),
    title = document.getElementById("title"),
    author = document.getElementById("author"),
    description = document.getElementById("description"),
    content = document.getElementById("content"),
    results = document.getElementById("results"),
    container = document.getElementById("container"),
    link = document.getElementById("link"),
    number = 0,
    news = [];

  button.addEventListener("click", function() {
    search = input.value;
    newsAPI();
  });

  input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      button.click();
    }
  });

  async function newsAPI() {
    if (search) {
      response = await fetch(
        "https://newsapi.org/v2/everything?language=en&q=" +
          search +
          "&apiKey=6cf8ac8dfd324e3ba413c179ad75ea8f"
      );
    } else {
      response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=gb&apiKey=6cf8ac8dfd324e3ba413c179ad75ea8f"
      );
    }

    news = await response.json();
    console.log(news.articles);
    if (news.articles.length > 0) {
      container.classList.remove("hidden");
      results.classList.add("hidden");
      if (news.articles[number].urlToImage) {
        image.src = news.articles[number].urlToImage;
      } else {
        image.src = "/src/assets/noImage.jpeg";
      }
      title.innerHTML = news.articles[number].title;
      author.innerHTML = news.articles[number].author;
      description.innerHTML = news.articles[number].description;
      content.innerHTML = news.articles[number].content;
      link.href = news.articles[number].url;
    } else {
      container.classList.add("hidden");
      results.classList.remove("hidden");
      results.innerHTML = "No results";
    }
  }

  document.getElementById("left").addEventListener("click", function() {
    let length = news.articles.length;
    if (length >= 5) {
      length = 5;
    }
    if (number === 0) {
      number = length - 1;
    } else {
      number--;
    }

    console.log(number);
    newsAPI();
  });
  document.getElementById("leftMobile").addEventListener("click", function() {
    let length = news.articles.length;
    if (length >= 5) {
      length = 5;
    }
    if (number === 0) {
      number = length - 1;
    } else {
      number--;
    }
    console.log(number);
    newsAPI();
  });

  document.getElementById("right").addEventListener("click", function() {
    let length = news.articles.length;
    if (length >= 5) {
      length = 5;
    }
    if (number === length - 1) {
      number = 0;
    } else {
      number++;
    }
    console.log(number);
    newsAPI();
  });
  document.getElementById("rightMobile").addEventListener("click", function() {
    let length = news.articles.length;
    if (length >= 5) {
      length = 5;
    }
    if (number === length - 1) {
      number = 0;
    } else {
      number++;
    }
    console.log(number);
    newsAPI();
  });

  newsAPI();
})();
