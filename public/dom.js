var articleRenderer = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;
    var TAG_INPUT;
    var newsLoaded;
    var f_config = {
                sinceDate: undefined,
                untilDate: undefined,
                author: undefined,
                tags: undefined
            };
    var currentUser = null;
    var users = [
    {
    	uname: "admin",
    	password: "admin"
    }, 
    {
    	uname: "Gleb",
    	password: "Hleb"
    },
    {
    	uname: "ШАРИТ",
    	password:"12345"
    },

    ]

    function init() {
        /* DOM Загрузился.
           Можно найти в нем нужные элементы и сохранить в переменные */
        newsHandler.getFromLocal();
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.news-list');
        TAG_INPUT = document.querySelector('#template-new-tag');
    }
    document.addEventListener("DOMContentLoaded", listeners);

    function listeners() {
        init();
        newsLoaded = Math.min(newsHandler.getAmount(), 10);
        insertArticlesInDOM(newsHandler.getArticles(0, newsLoaded));
        document.querySelector('.news-list').addEventListener("click", newsListeners);
        document.querySelector('.filter_box').addEventListener("click", filterListeners);
        document.querySelector('.header').addEventListener("click", headerListeners);
        document.querySelector('.closelogin').addEventListener("click", hideLogin);
        document.querySelector('.closeadd').addEventListener("click", hideAdd);
        document.querySelector('.closeedit').addEventListener("click", hideEdit);
        document.querySelector('.closeopen').addEventListener("click", hideOpen);
        document.querySelector('.pager').addEventListener("click", loadMore);
        document.getElementById('enter').addEventListener("click", logFunc);
        document.getElementById('adding').addEventListener("click", addNew);
        document.getElementById('checkbox_d').addEventListener("click", checkBox);
        document.getElementById('checkbox_a').addEventListener("click", authorBox);
    }

    function deleteTag(){
    	event.target.parentNode
    	document.querySelector('.tag_block').removeChild(event.target.parentNode);
    	document.querySelector('.add_tag').style.display = 'block';
    }

    function submitTag(){
    	//alert ("sdof");
    	//document.querySelector('.add_tag').style.display = 'block';
    }

    function newTag(){
    	var target = event.target;
    	document.querySelector('.tag_block').insertBefore(TAG_INPUT.content.cloneNode(true), target);
    	//target.style.display = 'none';

        //document.querySelector('.new_tag').addEventListener("submit", submitTag);
        
    	//console.log (event.target);
    }

    function authorBox(){
    	var input = document.querySelector('.author_input');
    	if (input.style.background == "white"){
    		input.style.background = "#c6c6c6";
    		input.disabled = 1;
    	}
    	else{
    		input.disabled = 0;
    		input.style.background = "white";
    	}
    }

    function tagBox(){
    	var add = document.querySelector('.add_tag');
    	var inputs = document.getElementsByClassName("tag_input");
    	if (document.getElementById("checkbox_t").checked){
    		for (var i = 0; i < inputs.length; i++){
    			inputs[i].style.background = "white";
  	 			inputs[i].disabled = 0;
    		}
    		add.style.color = "black";
    		add.style.cursor = "pointer";
    	}
    	else{
    		for (var i = 0; i < inputs.length; i++){
    			inputs[i].style.background = "#c6c6c6";
  	 			inputs[i].disabled = 1;
    		}
    		add.style.color = "#707070";
    		add.style.cursor = "default";
    	}
    }

    function checkBox(){
    	var from = document.querySelector('#fromdate');
    	var to = document.querySelector('#todate');
    	if (from.style.background == "white"){
    		from.style.background = "#c6c6c6";
    		from.disabled = 1;
    		to.disabled = 1;
    		to.style.background = "#c6c6c6";
    	}
    	else{
    		from.disabled = 0;
    		to.disabled = 0;
    		from.style.background = "white";
    		to.style.background = "white";
    	}
    }

    function addNew(){
    	var iTitle = document.querySelector('.title_input').value;
    	var iUrl = document.querySelector('.img_url').value;
    	var iSum = document.getElementById('sum').value;
    	var iContent = document.getElementById('content').value;

    	var newArticle = {
    		id: (new Date()).valueOf().toString(),
   			tags: ["тэг", "космос", "SpaceX", "МКС"],
   			img: iUrl,
   			title: iTitle,
  			summary: iSum,
   			createdAt: new Date(),
   			author: currentUser.uname,
   			content: iContent
    	}
       	
    	if (newsHandler.addArticle(newArticle) && newsHandler.check(newArticle, f_config)){
    		insertArticleIntoList(newArticle);
    	}

    	hideAdd();
    }

    function logFunc(){
    	var iName = document.getElementById('uname').value;
    	var iPass = document.getElementById('psw').value;
    	var user = {uname: iName,
    		password: iPass};
    	
    	if (!users.find(u => user.uname === u.uname && user.password === u.password)){
    	 alert("Неверные данные");
    	 return;
    	}

    	currentUser = user;
   		loggedAction();
 		return true;
    }

    function loggedAction(){
    	document.querySelector(".log_in_text").innerHTML = currentUser.uname;
    	document.querySelector('.add_window').style.display='none';
    	document.querySelector('.add_icon').style.display='block';
    	document.querySelector('.log_in_icon').style.display='none';
    	document.querySelector('.log_out_icon').style.display='block';

    	var newsarray = document.getElementsByClassName('news_opt');
    	for (var i = 0; i < newsarray.length; i++){
    		newsarray[i].style.display = "inline-block";
    	}
    	//document.querySelector('.news_opt').style.display='inline-block';

    	hideLogin();
    	
    }

    function exitAction(){
    	currentUser = null;
    	document.querySelector(".log_in_text").innerHTML = "Войти";
    	document.querySelector('.add_icon').style.display='none';
    	document.querySelector('.log_in_icon').style.display='block';
    	document.querySelector('.log_out_icon').style.display='none';
    	var newsarray = document.getElementsByClassName('news_opt');
    	for (var i = 0; i < newsarray.length; i++){
    		newsarray[i].style.display = "none";
    	}
    	//document.querySelector('.news_opt').style.display='none';
    	hideLogin();
    	
    }

    function loadMore(){
    	debugger;
        if (newsLoaded < newsHandler.getAmount()){
            var quantity = Math.min(newsHandler.getAmount() - newsLoaded, 10);
            insertArticlesInDOM(newsHandler.getArticles(newsLoaded, Math.min(newsHandler.getAmount() - newsLoaded, 10)));
            newsLoaded += quantity;
        }
        if (newsLoaded = newsHandler.getAmount()){
          document.querySelector('.pager').style.display='none';
        }
    }

    function hideLogin(){
        document.querySelector('.modal').style.display='none';
        document.body.style.overflow = "auto";
    }

    function hideOpen(){
        document.querySelector('.full_window').style.display='none';
        document.body.style.overflow = "auto";
    }

    function hideAdd(){
        document.querySelector('.add_window').style.display='none';
        document.body.style.overflow = "auto";
    }

    function hideEdit(){
        document.querySelector('.edit_window').style.display='none';
        document.body.style.overflow = "auto";
    }

    function newsListeners() {

        if (event.target.id === "del-but"){
           // alert("delete this");
            removeArticleFromList();
        }

        if (event.target.id === "edit-but"){
        	editWindow();
        	document.body.style.overflow = "hidden";
        }

        if (event.target.className === "news_img"){
            openWindow();
            document.body.style.overflow = "hidden";
        }

        if (event.target.className == "news_title"){
            openWindow();
            document.body.style.overflow = "hidden";
        }
    }

    function openWindow(){
    	var viewWindow = document.querySelector('.full_window');
    	var target = event.target;

  		while (target.className !== "news_block") {
    		target = target.parentNode;
  		}

  		var editID = target.dataset.id;
  		var article = newsHandler.getArticle(editID);

    	viewWindow.style.display = 'block';
    	viewWindow.querySelector(".full_title").innerHTML = article.title;
    	viewWindow.querySelector(".full_img").src = article.img;
    	viewWindow.querySelector(".full_summary").innerHTML = article.summary;
    	viewWindow.querySelector(".full_content").innerHTML = article.content;
    	viewWindow.querySelector(".newsdate").textContent = formatDate(article.createdAt);
    	viewWindow.querySelector(".author_news").innerHTML = article.author;
    	viewWindow.querySelector(".downtags").innerHTML = article.tags;;
    }

    function editWindow(){
    	var editNew = document.querySelector('.edit_window');
    	 
    	var target = event.target;

  		while (target.className !== "news_block") {
    		target = target.parentNode;
  		}

  		var editID = target.dataset.id;
  		var article = newsHandler.getArticle(editID);

		editNew.style.display = 'block';
    	editNew.querySelector(".title_input").value = article.title;
    	editNew.querySelector(".img_url").value = article.img;
    	editNew.querySelector("#sum").value = article.summary;
    	editNew.querySelector("#content").value = article.content;

    	document.getElementById('editing').addEventListener("click", editArticle);

    	function editArticle(){

	    	var iTitle = editNew.querySelector('.title_input').value;
	    	var iUrl = editNew.querySelector('.img_url').value;
	    	var iSum = editNew.querySelector("#sum").value;
	    	var iContent = editNew.querySelector("#content").value;

	    	var newArticle = {
	   			tags: ["тэг", "космос", "SpaceX", "МКС"],
	   			img: iUrl,
	   			title: iTitle,
	  			summary: iSum,
	   			content: iContent
	    		}

	    	newsHandler.editArticle(editID, newArticle);


	    	target.querySelector(".news_title").innerHTML = iTitle;
    		target.querySelector(".news_img").src = iUrl;
    		target.querySelector(".news_text").innerHTML = iSum;
    		hideEdit();
    	}
    }

    function pageListeners() {

        if (event.target.className == "page_icon_l"){
            alert("previous");
        }

        if (event.target.className == "page_icon_r"){
            alert("next");
        }

        if (event.target.className == "page_icon"){
            alert(event.target.innerHTML);
        }
    }

    function filterListeners() {
        if (event.target.className == "f_button"){
            removeArticlesFromDom ();
            
            f_config = {
                sinceDate: undefined,
                untilDate: undefined,
                author: undefined,
                tags: undefined
            };
            if (document.getElementById('checkbox_d').checked){
                var from = document.getElementById("fromdate").value;
                f_config.sinceDate = new Date(from.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));

                var to = document.getElementById("todate").value;
                f_config.untilDate = new Date(to.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
            }
            if (document.getElementById('checkbox_a').checked){
                var author = document.querySelector('.author_input').value;
                f_config.author = author;
            }
            if (document.getElementById('checkbox_t').checked){
                var tagArray = [];
                var inputs = document.getElementsByClassName("tag_input");
                for (var i = 0; i < inputs.length; i++){
                	tagArray.push(inputs[i].value);
    			}
                f_config.tags = tagArray;
            }
            var output = newsHandler.getArticles(0, 10, f_config);
            insertArticlesInDOM(output);
            newsLoaded = output.length;
            if (newsLoaded === 0){
            	ARTICLE_LIST_NODE.innerHTML = "Результатов не найдено";
            }
            if (newsLoaded <= newsHandler.getAmount())
            	document.querySelector('.pager').style.display='none';

        }

        if (event.target.className == "add_tag"){
        	if (document.getElementById("checkbox_t").checked)
        		newTag();
        }
        if (event.target.className == "remove_tag"){
        	if (document.getElementById("checkbox_t").checked)
        		deleteTag();
        }

        if (event.target.id == "checkbox_t"){
        	tagBox();
        }
    }

    function headerListeners() {
        if (event.target.className == "add_icon"){
            document.querySelector('.add_window').style.display='block';
            document.body.style.overflow = "hidden";
        }

        if (currentUser == null){
        	if (event.target.className == "log_in_icon" || event.target.className == "log_in_text"){
            	document.querySelector('.modal').style.display='block';
            	document.body.style.overflow = "hidden";
        	}
    	}

        if (event.target.className == "log_out_icon"){
        	exitAction();
        }
    }

    function insertArticleIntoList(article) {
    	//var renderedArticle = renderArticle(article);
        ARTICLE_LIST_NODE.insertBefore(renderArticle(article), ARTICLE_LIST_NODE.firstChild);
        if (currentUser !== null){
        	ARTICLE_LIST_NODE.firstChild.querySelector("#del-but").style.display = "inline-block";
        	ARTICLE_LIST_NODE.firstChild.querySelector("#edit-but").style.display = "inline-block";
    	}

        //removeArticlesFromDom();
        //insertArticlesInDOM(getArticles(skip, top, filterConfig));
       
    }

    function insertArticlesInDOM(articles) {
        /* для массива объектов статей получим соотвествующие HTML элементы */
        var articlesNodes = renderArticles(articles);
        /* вставим HTML элементы в '.article-list' элемент в DOM. */
        articlesNodes.forEach(function (node) {
            //ARTICLE_LIST_NODE.insertBefore(node, ARTICLE_LIST_NODE.firstChild);
            ARTICLE_LIST_NODE.appendChild(node);
            
            if (currentUser !== null){
        		node.querySelector("#del-but").style.display = "inline-block";
        		node.querySelector("#edit-but").style.display = "inline-block";
    		}
        });
    }

    function insertArticleInDOM(article) {
        var articleNode = renderArticle(article);
        ARTICLE_LIST_NODE.appendChild(articleNode);
    }

    function removeArticlesFromDom () {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function editArticleInDOM (id, article) {
        newsHandler.editArticle(id, article);
        removeArticlesFromDom();
        insertArticlesInDOM(getArticles(skip, top, filterConfig));
    }

    function removeArticleFromList () {
        //var del = document.querySelector("[data-id='" + id + "']");
        var del = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        //var del = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        newsHandler.removeArticle(del.dataset.id);
        ARTICLE_LIST_NODE.removeChild(del);
        
        //del.innerHTML = '';
        //removeArticle(id);
    }

    function renderArticles(articles) {
        /* каждый объект article из массива преобразуем в HTML элемент */
        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        /*
         Используем template из DOM, заполним его данными конкретной статьи - article.
         Этот код можно сделать лучше ...
        */
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.news_block').dataset.id = article.id;
        template.content.querySelector('.news_title').textContent = article.title;
        template.content.querySelector('.news_text').textContent = article.summary;
        template.content.querySelector('.author_news').textContent = article.author;
        template.content.querySelector('.downtags').textContent = article.tags;
        template.content.querySelector('.news_img').src = article.img;
        template.content.querySelector('.newsdate').textContent = formatDate(article.createdAt);

        /*
         Склонируем полученный контент из template и вернем как результат
        */
        return template.content.querySelector('.news_block').cloneNode(true);
    }

    /* Date -> 16/05/2015 09:50 */
    function formatDate(d) {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes();
    }

    
    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom,
        insertArticleInDOM: insertArticleInDOM,
        insertArticleIntoList: insertArticleIntoList,
        removeArticleFromList: removeArticleFromList
    };
}());


//document.addEventListener("DOMContentLoaded", init());
//document.querySelector('.news_opt').addEventListener("click", alert("delete this"));

//articleRenderer.init();
//articleRenderer.insertArticleIntoList('wat', 'wat', 'wat', ['wat'], 'https://i.ytimg.com/vi/gi-EfcwJNdg/hqdefault.jpg?custom=true&w=336&h=188&stc=true&jpg444=true&jpgq=90&sp=67&sigh=LCNmhX6vk70L1WOKeTYH-kx2XtQ' , 'wat');