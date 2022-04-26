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
            let article = [];
            $(data).find("item").each(function(){

                let title = $(this).find('title').text();
                let link = $(this).find('link').text();
                let description = $(this).find('description').text();
                let category = $(this).find('category').text();
                let date = $(this).find('pubDate').text().slice(0,22);

                article.push([title,link,description,category,date]);
            });

            let item2 = article;
            let item = item2.shift();
            document.getElementsByTagName("a")[0].innerHTML=item[0];
            document.getElementsByTagName("a")[0].setAttribute('href',item[1]);
            document.getElementsByTagName("div")[5].innerHTML=item[4] + '<br>' +item[3];
            document.getElementsByTagName("div")[6].innerHTML=item[2];

            //console.log(document.getElementsByTagName("div"));
            const sub_article = document.getElementsByClassName("container2");
            /*console.log(sub_article[0])
            console.log(sub_article[0].getElementsByTagName("a"))
            
            console.log(sub_article[0].getElementsByClassName("container2__box2__teaser"))
            */
            let i=0;
            let bla;
            item2.forEach(element => {

                sub_article[0].getElementsByTagName("a")[i%2].innerHTML=element[0];
                sub_article[0].getElementsByTagName("a")[i%2].setAttribute('href',element[1]);
                sub_article[0].getElementsByClassName("container2__box2__teaser")[i%2].innerHTML=element[4] + '<br>' +element[3]+'<br>'+' <br>'+element[2];
                
                if (i%2==1) {
                    console.log(sub_article[0]);
                    $('.container2').append(sub_article[0]);
                i++; 
                  
            });
            /*
            item2.forEach(element =>{
                $('.container2').append(
                    '<div class="container2__box2">'+
                    '<h2>'+
                    '<a class="color--green" target="_self" href="'+element[1]+'">'+
                    element[0]+
                    '</a>'+
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
