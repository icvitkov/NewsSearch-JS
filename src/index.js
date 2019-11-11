(function() {
  var input = $("#input"),
    button = $("#button"),
    search = "",
    image = $("#urlToImage"),
    title = $("#title"),
    author = $("#author"),
    description = $("#description"),
    content = $("#content"),
    results = $("#results"),
    container = $("#container"),
    link = $("#link"),
    number = 0,
    news = [];

  button.click(function() {
    search = input.val();
    newsAPI();
  });

  input.keyup(function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      button.click();
    }
  });

  async function newsAPI() {
    let response = {};
    if (search) {
      response = await fetch(
        "https://newsapi.org/v2/everything?language=en&q=" +
          search +
          "&apiKey=6cf8ac8dfd324e3ba413c179ad75ea8f"
      );
    } else {
      response = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=6cf8ac8dfd324e3ba413c179ad75ea8f"
      );
    }

    news = await response.json();
    if (news.articles.length > 0) {
      container.removeClass("hidden");
      results.addClass("hidden");
      if (news.articles[number].urlToImage) {
        image.prop("src", news.articles[number].urlToImage);
      } else {
        image.prop("src", "/src/assets/noImage.jpeg");
        image.addClass("unknown");
      }
      title.html(news.articles[number].title);
      author.html(news.articles[number].author);
      function limitString(string, number) {
        return (
          string
            .split(" ")
            .splice(0, number)
            .join(" ") + "..."
        );
      }
      description.html(limitString(news.articles[number].description, 19));
      content.html(limitString(news.articles[number].content, 30));
      link.prop("href", news.articles[number].url);
    } else {
      container.addClass("hidden");
      results.removeClass("hidden");
      results.html("No results");
    }
  }

  function prev(element) {
    $(element).click(function() {
      let length = news.articles.length;
      if (length >= 5) {
        length = 5;
      }
      if (number === 0) {
        number = length - 1;
      } else {
        number--;
      }
      newsAPI();
    });
  }

  function next(element) {
    $(element).click(function() {
      let length = news.articles.length;
      if (length >= 5) {
        length = 5;
      }
      if (number === length - 1) {
        number = 0;
      } else {
        number++;
      }
      newsAPI();
    });
  }

  prev("#left");
  prev("#leftMobile");
  next("#right");
  next("#rightMobile");
  newsAPI();
})();
