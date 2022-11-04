 // Está claro que guardar la api key aquí supone una brecha de seguridad considerable.
 // Solución: utilizar vaiables de entorno (.env), para lo que sería necesario
 // implementar una solución en el lado del servidor

var currentQuery = "";
var genres = "";
var urlGET ="";

var API_KEY ="2ea7f0eba5beabcbdc53db4229cf4e0c";

$(document).ready(function () {
   urlGET = "https://api.themoviedb.org/3/genre/movie/list?api_key="+ API_KEY +"&language=en-U";
   $.ajax({
      method: 'GET',
      url: urlGET,
      dataType: 'json',
      success: function (data) {
         genres = JSON.stringify(data.genres);
      },
      error: function () {
         alert("Not found!");
      } 
 });
});

 function search(f) {
    var text = f.text.value;
     urlGET = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + text;
     document.getElementById("movieDetails").style.display = "none";
    $.ajax({
         method: 'GET',
         url: urlGET,
         dataType: 'json',
         success: function (data) {
            currentQuery = JSON.stringify(data.results);
            if (data.results.length > 0) {
               showResults(data.results);
               document.getElementById("searcherTitle").innerHTML = "Continue";
            } else {
               alert("Not found!");
            }
            
         },
         error: function () {
            alert("Not found!");
         } 
    });

   return false;
    
 }

 function showResults(r) {
   var res = "";
   for (var i = 0; i<r.length; i++){
      var img = getImage(r[i]);
      res += "<div class='container'><div class='result'><a href='javascript:showDetails(" + r[i].id + ")'><h3>" + r[i].title +  " (" + r[i].release_date.substring(0, 4) + ")</h3></a></div><div clas='resIMG'>" + img + "</div></div>";
   }
   
               
   document.getElementById("searchResults").innerHTML = res;

   document.getElementById("searchResults").style.display = "inline-block";
   document.getElementById("searchResults").style.width = "100%";
 }


 function getImage(r) {
   var res="";
   if(r.poster_path == null) {
      res = "No image available"
   } else {
      res = "<img src='https://image.tmdb.org/t/p/w185/"+ r.poster_path + "' alt='Image of the poster'>";
   }
   //ajax
   return res;
 }

 function showDetails(id) {
   var currentQueryJson = JSON.parse(currentQuery);
   var res = "";
   for (var i = 0; i < currentQueryJson.length; i++) {
      if (currentQueryJson[i].id == id){
         var img = getImage(currentQueryJson[i]);
         var description = "No description found";
         if (currentQueryJson[i].overview.length !== 0) {
            description = currentQueryJson[i].overview;
         }
         res +="<div class='containerDetails'><div class='resultDetails'><h3>" + currentQueryJson[i].title + " (" + currentQueryJson[i].release_date.substring(0, 4) + ")</h3><h4>User rating: "+ Math.round(currentQueryJson[i].vote_average * 10) +"%</h4><p>"+ currentQueryJson[i].release_date + " " + getGenres(currentQueryJson[i].genre_ids) + "</p><p>Original language: "+ currentQueryJson[i].original_language +"</p><p>Description:</p><p>"+ description +"</p></div><div class='resIMGDetails'>" + img + "</div></div>";
      }
   }

   document.getElementById("movieDetails").innerHTML = res;

   document.getElementById("searchResults").style.display = "none";

   document.getElementById("movieDetails").style.display = "inline-block";
   document.getElementById("movieDetails").style.width = "100%";
 }

 function getGenres(g) {
   var genresAux = JSON.parse(genres);
   var res ="";
   for (var i=0; i < g.length; i++) {
      for (var j=0; j < genresAux.length; j++) {
         if (g[i] == genresAux[j].id) {
             res += "· " + genresAux[j].name;
         }
      }
   }
   return res;
 }