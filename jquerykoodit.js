 //jquery animaatio joka toimii kun sivu on latautunut
$(document).ready(function(){        
  $(".header").mouseenter(function(){        
    $(".header").animate({letterSpacing: "+=10px"});     //animoidaan "Leffasovellus" teksti muuttamalla kirjain väliä suuremmaksi kun hiiri menee teksti elementin päälle.
  });
$(".header").mouseleave(function(){     //teksi palautuu normaaliksi kun hiiri viedään pois elementin päältä
  $(".header").animate({letterSpacing: "-=10px"});
  });
});

  //.ready tarkistaa, että DOM -sisältö on kokonaan valmis käsiteltäväksi
$(document).ready(function() {
  //kutsutaan .ajaxilla XML sivuston dataa
  $.ajax({
    url: "https://www.finnkino.fi/xml/TheatreAreas/",
    type: "GET",
    dataType: "html",
    success: function(xml) {
      //jos data on kunnossa (success), lähtee alla oleva fuktio toimintaan
      //etsitään tag TheatreArea xml tiedostosta .each loopilla
        $(xml).find('TheatreArea').each(function() {
          //haetaan jokainen tag theatrearea ja niiden sisältä 'name' ja 'id'
          var theatreText = $(this).find('Name').text();
          var theatreID = $(this).find('ID').text();
          //tulostetaan select tauluun sisällöt
          $("#theatreList").append('<option value = ' + theatreID + '>' + theatreText + '</option>');
        });
    }
  });
});

/* Kun käyttäjä valitsee teatterin niin se kutsuu tätä funktiota
   joka hakee finnkinon sivuilta kyseisen teatterin elokuva aikataulun */
$("#theatreList").change(function(){
  $("#list").text("");
  var id = $("#theatreList").val();
  $("#userInput").css("display", "block");

  //Elokuvan tietojen ajax kutsu
  $.ajax({
    url: "https://www.finnkino.fi/xml/Schedule/?area=" + id,
    type: "GET",
    dataType: "html",
    success: function(xml) {
      //haetaan xml tiedot looppia hyödyntäen
        $(xml).find('Show').each(function() {
          //tallennetaan eri tiedot muuttujiin
          var imageURL = '<img class="images" src="' + $(this).find('EventSmallImagePortrait').text() + '">';
          var movie = $(this).find('Title').text();
          var Genre = $(this).find('Genres').text();
          var Schedule = $(this).find('dttmShowStart').text();
          var Duration = $(this).find('LengthInMinutes').text();
          var place = $(this).find("TheatreAuditorium").text();  

          //parsitaan xml:stä vain tarvittavat aikataulutiedot
          var time = Schedule.slice(11, 16);

         //lopullinen tulostus tauluun
         $("#list").hide();
         $("#list").append('<tr><td>' + "Elokuva" + '</td><th>' + "Genre" + '</th><th>' + "Kesto" + '</th><th>' + "Alkamisaika" + '</th><th>' + "Sali" + '</th></td></tr>');
         $("#list").fadeIn(400);

         $("#list").hide();
          $("#list").append('<tr><td>'+ imageURL + '</td><th>' + movie + '<th>' + Genre + '</th><th>' + Duration + " min <th><th>" + time + '<th> <th>' + place + '</td>');
          $("#list").fadeIn(400);
          $("#topbutton").hide();
          $("#topbutton").append(); 
          $("#topbutton").fadeIn(400);
        });
    }
  });
});

//Erillisen hakukentän funktiot
$("#userInput").keyup(function(){
  //Declare variables
 var input = $("#userInput").val();
 var filter = input.toUpperCase();
 var table = $("#list");
 // Loop through all list items, and hide those who don't match the search query
 $(table).find('tr').each(function() {
   var tdText = $(this).text();
   if(tdText.toUpperCase().indexOf(filter) > -1 ) {
     $(this).fadeIn(1000);
   } else {
     $(this).fadeOut(1000);
   }
 });
});


















































