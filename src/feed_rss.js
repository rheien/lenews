$(document).ready(function(){

    $.ajax("https://sqrt-jokes.herokuapp.com/welt", {
        type: 'GET',
        dataType: "xml",
        error: function(err){
            alert("Welt zurzeit nicht verfügbar.");
            console.log("XML Datei nicht abrufbar", err);
        },
        success : function(data){
            $('.box1').children().remove();
            $('.container2').children().remove();
            let article = [];
            $(data).find("item").each(function(){

                let title = $(this).find('title').text();
                let link = $(this).find('link').text();
                let description = $(this).find('description').text();
                let category = $(this).find('category').text();
                let date = $(this).find('pubDate').text().slice(0,22);

                article.push([title,link,description,category,date]);
            });

            let item = article.shift();
            $('.box1').append(
                '<h1 class="box1--position-left">'+
                '<a class="color--green" target="_self" href='+item[1]+'>'+item[0]+'</a>'+
                '</h1>'+
                '<div class="box1--position-left div__inline-block color--grey">'+item[4]+'<br> Kategorie: '+item[3]+
                '</div>'+
                '<div class="box1--position-right div__inline-block color--grey">'+
                item[2]+ 
                '</div>'
            );

            article.forEach(element => {
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
            });
        },
    });
});
