var genres = "";
var currentQuery = "";

//query to the server to search the API genres
$(document).ready(function () {
   $.ajax({
      method: 'GET',
      url: '/genres',
      dataType: 'json',
      success: function (data) {
         genres = data;
      },
      error: function (e) {
         alert("Not found!");
         console.log(e);
      } 
 });
});

//server query to search the movie and tells to show results
 function search(f) {
    var text = f.text.value;
     document.getElementById("movieDetails").style.display = "none";
    $.ajax({
         method: 'GET',
         url: '/results?'+text,
         dataType: 'json',
         success: function (data) {
            if (data.results.length > 0) {
               showResults(data.results);
               currentQuery=data.results;
               document.getElementById("searcherTitle").innerHTML = "Continue";
            } else {
               alert("Not found!");
            } 
         },
         error: function (e) {
            alert("Not found!");
            console.log(e);
         } 
    });

   return false;
    
 }

 //actually shows search results
 function showResults(r) {
   var res = "";
   console.log(r);
   for (var i = 0; i<r.length; i++){
      var img = getImage(r[i].poster_path);
      var date = (('release_date' in r[i]) && (r[i].release_date!==null) && (r[i].release_date!=="")) ? r[i].release_date.substring(0, 4) : "No date found";
      res += "<div class='container'><div class='result'><a href='javascript:showDetails("+ i +")'><h3>" + r[i].title +  " (" + date + ")</h3></a></div><div clas='resIMG'>" + img + "</div></div>";
   }
               
   document.getElementById("searchResults").innerHTML = res;

   document.getElementById("searchResults").style.display = "inline-block";
   document.getElementById("searchResults").style.width = "100%";
 }

//gets the image and returns html string, with given poster path
 function getImage(posterPath) {
   var res = posterPath == null ? "No image available" : "<img src='https://image.tmdb.org/t/p/w185/"+ posterPath + "' alt='Image of the poster'>";
   return res;
 }

 //when movie clicked, web shows its details:
 //title, release date, the average user punctuation, genres, original language, description and poster image
 function showDetails(id) {
   var r = currentQuery[id];
   var res = "";
   var img = getImage(r.poster_path);
   var description = r.overview.length !== 0 ? description = r.overview : "Description not available";
   var date = (('release_date' in r) && (r.release_date!==null) && (r.release_date!=="")) ? r.release_date.substring(0, 4) : "No date found";
   var date2 = 'release_date' in r ? r.release_date : "No date found";
   res +="<div class='containerDetails'><div class='resultDetails'><h3>" + r.title + " (" + date + ")</h3><h4>User rating: "+ Math.round(r.vote_average * 10) +"%</h4><p>"+ date2 + " " + getGenres(r.genre_ids) + "</p><p>Original language: "+ r.original_language +"</p><p>Description:</p><p>"+ description +"</p></div><div class='resIMGDetails'>" + img + "</div></div>";

   document.getElementById("searchResults").style.display = "none";

   document.getElementById("movieDetails").innerHTML = res;
   document.getElementById("movieDetails").style.display = "inline-block";
   document.getElementById("movieDetails").style.width = "100%";
 }

//gets the genres of a movie and returns string containig them
//g = array of the movie genres IDs
 function getGenres(g) {
   var genresAux = genres;
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
