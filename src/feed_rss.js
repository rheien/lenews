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
                let description = $(this).find('description').text();
                let category = $(this).find('category').text();
                let date = $(this).find('pubDate').text().slice(0,22);

                articles.push({title,link,description,category,date});
                
            });
            
            /* sorting by date */
            console.dir(articles)
            articles.sort((a,b) => {
                articles.forEach(a =>{
                    articles.forEach(b =>{
                        if(a[4]==b[4]) {return}
                            return a[4] - b[4];
                    });
                });
            });

            console.dir(articles)

            /* rendering first article */
            let first_article = articles[0];
            let box1 = document.getElementsByClassName('box1')[0];
            let newArticle = document.createElement('article');
            newArticle.className = 'box1--position-left  div__inline-block color--grey';
            

            let newHeading1 = document.createElement('h1');
            newHeading1.className = 'box1--position-left';

            let newLink = document.createElement('a');
            newLink.className = 'color--green';
            newLink.innerHTML = first_article.title;
            newLink.setAttribute("target","_self");
            newLink.setAttribute("href",first_article.link);

            let newTeaser = document.createElement('p');
            newTeaser.className = 'box1--position-right  div__inline-block color--grey';
            newTeaser.innerHTML = first_article.description;

            let newDate = document.createElement('div');
            newDate.className = 'box1--position-left div__inline-block color--grey';
            newDate.innerHTML = first_article.date + '<br>' +first_article.category;

            newHeading1.appendChild(newLink);
            newArticle.appendChild(newHeading1);
            newArticle.appendChild(newTeaser);
            newArticle.appendChild(newDate);
            box1.appendChild(newArticle);

            /* rendering other articles */
            let box2 = document.getElementsByClassName('box2')[0];
            articles.forEach((element,index ) => {
                if(index==0){return }


                newArticle = document.createElement('article');
                newArticle.className = 'container2__box2';
                box2.appendChild(newArticle);

                let newHeading2 = document.createElement('h2');
                newLink = document.createElement('a');
                newLink.className = 'color--green';
                newLink.innerHTML = element[0];
                newLink.setAttribute("target","_self");
                newLink.setAttribute("href",element[1]);
                newHeading2.appendChild(newLink);

                box2.appendChild(newHeading2);

                newArticle = document.createElement('article');
                newArticle.className = 'container__box2__teaser color--grey';
                newArticle.innerHTML = element[4] + '<br>' +element[3]+'<br>'+' <br>'+element[2];
                box2.appendChild(newArticle);
            }); 
        },
    });
});
