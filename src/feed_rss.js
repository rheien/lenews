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
            newDate.textContent = first_article.date;

            let lineBreak = document.createElement('span')
            lineBreak.className= 'line_break';
            newDate.append(lineBreak);
            newDate.append(first_article.category);
            
            newHeading1.appendChild(newLink);
            newArticle.appendChild(newHeading1);
            newArticle.appendChild(newDate);
            newArticle.appendChild(newTeaser);
            box1.appendChild(newArticle);

            /* rendering other articles */
            let box2 = document.getElementsByClassName('box2')[0];
            articles.forEach((element,index ) => {
                if(index==0){return }

                newArticle = document.createElement('article');
                newArticle.className = 'container2__box2';

                newLink = document.createElement('a');
                newLink.className = 'color--green';
                newLink.textContent = element.title;
                newLink.setAttribute("target","_self");
                newLink.setAttribute("href",element.link);

                newDate = document.createElement('p');
                newDate.className = 'container2__box2__teaser color--grey';
                newDate.textContent = element.date;
                lineBreak = document.createElement('span')
                lineBreak.className= 'line_break';
                newDate.append(lineBreak);
                newDate.append(element.category);

                newTeaser = document.createElement('p');
                newTeaser.className = 'container2__box2__teaser color--grey';
                newTeaser.innerHTML = element.teaser;

                let newHeading2 = document.createElement('h2');

                newHeading2.appendChild(newLink);
                newArticle.appendChild(newHeading2);
                newArticle.appendChild(newDate);
                newArticle.appendChild(newTeaser);
                box2.appendChild(newArticle);
            }); 
        },
    });

    /* search articles after keywords in title, category & teaser */
    $("input[type='text']").on('keypress keyup', function () {
        let value = $(this).val().toLowerCase();

        $("article").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        
    });
});
