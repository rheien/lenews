$(document).ready(function(){

    $.ajax("https://sqrt-jokes.herokuapp.com/welt", {
        type: 'GET',
        dataType: "xml",
        error: function(err){
            alert("Welt zurzeit nicht verfügbar.");
            console.log("XML Datei nicht abrufbar", err);
        },
        success : function(data){
            const articles = [];

            /* XML parsing */ 
            $(data).find("item").each(function(){
                
                let title = $(this).find('title').text();
                let link = $(this).find('link').text();
                let teaser = $(this).find('description').text();
                let category = $(this).find('category').text();
                let date = $(this).find('pubDate').text();

                articles.push({title,link,teaser,category,date});
    
            });
            
            /* sorting by date */
            articles.sort((a,b) => {
                let date_a = new Date(a.date);
                let date_b = new Date(b.date);
                if (date_a < date_b) {
                    return -1
                }
                else if (date_a > date_b) {
                    return 1
                }
                return 0 
            }).reverse();
           
            /* rendering the page */
            renderingArticle(articles);

            /* filter the search by title, teaser & category */
            let search_result = [];
            $("#searchArticle").on('keyup', function () {
                let input_value = $(this).val().toLowerCase();
                
                search_result = articles.filter(function(filtered_article){
                    if (filtered_article.title.toLowerCase().indexOf(input_value) > -1){return true}
                    else if (filtered_article.teaser.toLowerCase().indexOf(input_value) > -1){return true}
                    else if (filtered_article.category.toLowerCase().indexOf(input_value) > -1){return true}
                    else {return false}
                });
                $('.box1').children().remove();
                $('.box2').children().remove();


                
                /* what if search is empty? */
                if (input_value.length > 0 && search_result.length==0){
                    alert('kein Suchergebnis gefunden');
                    search_result = articles;
                }
                renderingArticle(search_result);
            });
        }
    });

    function renderingArticle(articles) {

        /* rendering first article */
        let first_article = articles[0];
        let box1 = document.getElementsByClassName('box1')[0];
        let newArticle = document.createElement('article');
        
        let newHeading1 = document.createElement('h1');
        newHeading1.className = 'box1--position-left';

        let newLink = document.createElement('a');
        newLink.className = 'color--green';
        newLink.textContent = first_article.title;
        newLink.setAttribute("target","_self");
        newLink.setAttribute("href",first_article.link);

        let newTeaser = document.createElement('p');
        newTeaser.className = 'box1--position-right  div__inline-block color--grey';
        newTeaser.textContent = first_article.teaser;

        let newDate = document.createElement('p');
        newDate.className = 'box1--position-left div__inline-block color--grey';
        newDate.appendChild(document.createTextNode(first_article.date));
        newDate.appendChild(document.createElement('br'));
        newDate.appendChild(document.createTextNode(first_article.category));
        
        newHeading1.appendChild(newLink);
        newArticle.appendChild(newHeading1);
        newArticle.appendChild(newDate);
        newArticle.appendChild(newTeaser);
        box1.appendChild(newArticle);

        /* rendering other articles */
        let box2 = document.getElementsByClassName('box2')[0];
        articles.forEach((article,index ) => {
            if(index==0){return }

            newArticle = document.createElement('article');
            newArticle.className = 'container2__box2';

            newLink = document.createElement('a');
            newLink.className = 'color--green';
            newLink.textContent = article.title;
            newLink.setAttribute("target","_self");
            newLink.setAttribute("href",article.link);

            newDate = document.createElement('p');
            newDate.className = 'container2__box2__teaser color--grey';
            newDate.appendChild(document.createTextNode(article.date));
            newDate.appendChild(document.createElement('br'));
            newDate.appendChild(document.createTextNode(article.category));

            newTeaser = document.createElement('p');
            newTeaser.className = 'container2__box2__teaser color--grey';
            newTeaser.innerHTML = article.teaser;

            let newHeading2 = document.createElement('h2');

            newHeading2.appendChild(newLink);
            newArticle.appendChild(newHeading2);
            newArticle.appendChild(newDate);
            newArticle.appendChild(newTeaser);
            box2.appendChild(newArticle);
        });       
    }

});
