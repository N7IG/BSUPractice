var newsHandler = (function () {
tagArray = ["тэг", "космос", "SpaceX", "МКС", "новость", "мир", "интересное", "DDOS", "wat"];

var articles;



function getFromLocal(){
  	let xhr = new XMLHttpRequest(); 
	xhr.open('GET', '/articles', false); 
	xhr.setRequestHeader('Content-Type', 'application/json'); 
	xhr.send(); 

	let articlesJSON = JSON.parse(JSON.stringify( xhr.responseText));
	if(articlesJSON) {
    	articles = JSON.parse(articlesJSON);
    	articles.forEach(function(item,i,arr){
      	item.createdAt = new Date(item.createdAt);
      })
    }
}

function updateLocal(){
  //localStorage.setItem("articles", JSON.stringify(articles));
  	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/articles', false)
	xhr.setRequestHeader('Content-Type', 'application/json')
	console.log(JSON.stringify(articles));
	xhr.send(JSON.stringify(articles));
}

function getArticles(skip, top, filterConfig){
    if (skip < 0 || skip > articles.length || (typeof skip != "number")) {
        console.log("invalid skip value");
        return undefined;
    }
    if ( top > articles.length || (typeof top != "number")) {
        console.log("invalid top value");
        return undefined;
    }

    var outputArticles = articles;
    if (filterConfig != undefined){
        var since = filterConfig.sinceDate || new Date(-1);
        var until = filterConfig.untilDate || new Date();
        var iAuthor = filterConfig.author;
        var iTags = filterConfig.tags || [];
        if (iAuthor !== undefined){
        outputArticles = outputArticles.filter(function checkAuthor(value) {
            return value.author === iAuthor;
        });
        }
        outputArticles = outputArticles.filter(function checkDate(value) {
            return value.createdAt.valueOf() > since.valueOf() && value.createdAt.valueOf() < until.valueOf();
        });
        outputArticles = outputArticles.filter(function checkTags(value) {
            for (var i = 0; i < iTags.length; i++){
              if (value.tags.indexOf(iTags[i]) === -1){
                  return false;
              }
            }           
            return true;
        });
    }
    outputArticles = outputArticles.sort(function byDate(firstElement, secondElement) {
        return secondElement.createdAt - firstElement.createdAt;
    });
    outputArticles = outputArticles.slice(skip, top + skip);
    return outputArticles;

}

function check(article, filterConfig){
  if (filterConfig != undefined){
        var since = filterConfig.sinceDate || new Date(-1);
        var until = filterConfig.untilDate || new Date();
        var iAuthor = filterConfig.author;
        var iTags = filterConfig.tags || [];
        if (iAuthor !== undefined){
          if (article.author !== iAuthor)
            return false;
        }
        
        // console.log(since.valueOf());
        // console.log(article.createdAt.valueOf());
        // console.log(until.valueOf());
        if (article.createdAt.valueOf() < since.valueOf() || article.createdAt.valueOf() > until.valueOf())
          return false;
        for (var i = 0; i < iTags.length; i++){
              if (article.tags.indexOf(iTags[i]) === -1){
                  return false;
              }
        }           
    }
  return true;
}

function getIndex(id){
  if (typeof id !== "string"){
        console.log("error");
        return undefined;
    }
    for (var i = 0; i < articles.length; i++){
          if (articles[i].id === id){
              return i;
          }
    }
    console.log("error");
    return undefined;
}

function getArticle(id) {
    if (typeof id !== "string"){
        console.log("error");
        return undefined;
    }
    for (var i = 0; i < articles.length; i++){
          if (articles[i].id === id){
              return articles[i];
          }
    }
    console.log("error");
    return undefined;
}

function validateArticle(article) {
  debugger;
    if (typeof article.id != "string" || article.id.length <= 0)
      return false;
    if (typeof article.title != "string" || article.title.length > 100 || article.title.length <= 0)
      return false;
    if (typeof article.summary != "string" || article.summary.length > 200 || article.summary.length <= 0)
      return false;
    if (article.createdAt instanceof Date === false )
      return false;
    if (typeof article.author != "string" || article.author.length <= 0)
      return false;
    if (typeof article.content != "string" || article.content.length <=0)
      return false;
    if (Array.isArray(article.tags)){
    if( article.tags.length >= 1){
      for (var i = 0; i < article.tags.length; i++){

        var contains = false;

        for (var j = 0; j < tagArray.length; j++){
          if (article.tags[i] === tagArray[j]){
            contains = true;
            break;
          }
        }
        if (contains === false)
          return false;
      }
    }
    else return false;
    }
    else return false;


    return true;
}

function addArticle(article) {
  
    for (var i = 0; i < articles.length; i++)
    {
      if (articles[i].id === article.id) {
        return false;
      }
    }
    if (validateArticle(article))
    {
        articles.push(article);
        updateLocal();
        return true;
    }
    else alert("NOT Валидный");
    
    return false;
}

function editArticle(id, article) {
    iArticle = getArticle(id);
    if (iArticle === undefined)
        return false;    

    var newArticle = Object.assign(iArticle, article);

    if (validateArticle(newArticle))
    {
        articles[getIndex(id)] = newArticle;
        updateLocal();
    }
    else
      alert("Validation failed");
}

function removeArticle(id) {
    for (var i = 0; i < articles.length; i++)
    {
      if (articles[i].id === id){
        articles.splice(i, 1);
        updateLocal();
        break;
      }
    }
    
}

function getAmount(){
  return articles.length;
}

function getJsArticles(){
  return JSON.stringify(articles);
}

return {
        getArticles: getArticles,
        getFromLocal: getFromLocal,
        getJsArticles: getJsArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        getIndex: getIndex,
        editArticle: editArticle,
        removeArticle: removeArticle,
        getAmount: getAmount,
        check: check,
        articles: articles
    };
}());
