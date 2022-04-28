$(document).ready(function(){

    $.ajax("https://sqrt-jokes.herokuapp.com/welt", {
        type: 'GET',
        dataType: "xml",
        error: function(err){
            alert("Welt zurzeit nicht verfügbar.");
            console.log("XML Datei nicht abrufbar", err);
        },
        success : function(data){
            //$('.container2').children().remove();
            let articles = [];

            $(data).find("item").each(function(){

                let title = $(this).find('title').text();
                let link = $(this).find('link').text();
                let description = $(this).find('description').text();
                let category = $(this).find('category').text();
                let date = $(this).find('pubDate').text().slice(0,22);

                articles.push([title,link,description,category,date]);
                
            });

            let node_first_article= document.body.firstElementChild;
            let newHeading1 = document.createElement('h1');
            let newHeading2 = document.createElement('h2');
            let newAttribute = document.createElement('a');
            let newDivision = document.createElement('div');
    
            let first_article = articles[0];
            
            newHeading1.className = 'box1--position-left';
            newAttribute.className = 'color--green';
            newAttribute.innerHTML = first_article[0];
            newAttribute.setAttribute("target","_self");
            newAttribute.setAttribute("href",first_article[1]);
            newHeading1.appendChild(newAttribute);

            node_first_article.childNodes[3].appendChild(newHeading1);

            newDivision.className = 'box1--position-left  div__inline-block color--grey';
            newDivision.innerHTML = first_article[4] + '<br>' +first_article[3];
            node_first_article.childNodes[3].appendChild(newDivision);

            newDivision = document.createElement('div');
            newDivision.className = 'box1--position-right  div__inline-block color--grey';
            newDivision.innerHTML = first_article[2];
            node_first_article.childNodes[3].appendChild(newDivision);


            console.log(node_first_article.childNodes[5])

            let sub_article = node_first_article.childNodes[5];
            articles.forEach((element,index ) => {
                if(index==0){return }

                newDivision = document.createElement('div');
                newDivision.className = 'container2__box2';
                sub_article.appendChild(newDivision);
                console.log(index)
                console.log(sub_article.childNodes[index+2])

                newHeading2 = document.createElement('h2');
                newAttribute = document.createElement('a');
                newAttribute.className = 'color--green';
                newAttribute.innerHTML = element[0];
                newAttribute.setAttribute("target","_self");
                newAttribute.setAttribute("href",element[1]);
                newHeading2.appendChild(newAttribute);

                sub_article.childNodes[index+2].appendChild(newHeading2);

                /*
                sub_article[0].getElementsByTagName("a")[0].innerHTML=element[0];
                sub_article[0].getElementsByTagName("a")[0].setAttribute('href',element[1]);
                sub_article[0].getElementsByClassName("container2__box2__teaser")[0].innerHTML=element[4] + '<br>' +element[3]+'<br>'+' <br>'+element[2];
                */
                /*console.log(Object.entries( sub_article))
                console.log(Object.values( sub_article))

                console.log(Object.entries( sub_article))
                
                $('.container2').append(sub_article[0]);*/
            }); 
            
                
            /*
            item2.forEach(element =>{
                $('.container2').append(
                    '<div class="container2__box2">'+
                   s="color--green" target="_self" href="'+element[1]+'">'+
                    element[0]+
                    '</a>'+ '<h2>'+
                    '<a clas
                    '</h2>'+
                    '<div class="color--grey" >'+element[4]+'<br> Kategorie: '+element[3]+
                    '<br>'+'<br>'+
                    '<div class="container2__box2__teaser color--grey">'+
                    element[2]+
                    '</div>'+
                    '</div>'
                );
            });*/
        },
    });
    
});
