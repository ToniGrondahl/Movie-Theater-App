 //jquery animaatio joka toimii kun sivu on latautunut
$(document).ready(function(){   
  $(".header").mouseenter(function(){
    //animoidaan "Leffasovellus" teksti muuttamalla kirjain väliä suuremmaksi kun hiiri menee teksti elementin päälle.
    $(".header").animate({letterSpacing: "+=10px"});
  });
$(".header").mouseleave(function(){    
  //teksi palautuu normaaliksi kun hiiri viedään pois elementin päältä
  $(".header").animate({letterSpacing: "-=10px"});
  });
});

  //.ready tarkistaa, että DOM-sisältö on valmis käsiteltäväksi
$(document).ready(function() {
  //kutsutaan .ajaxilla XML sivuston dataa
  $.ajax({
    url: "https://www.finnkino.fi/xml/TheatreAreas/",
    type: "GET",
    dataType: "html",
    success: function(xml) {
      //jos data on kunnossa (success), niin alla oleva funktio lähtee toimintaan
      //etsitään tag TheatreArea xml tiedostosta .each loopilla
        $(xml).find('TheatreArea').each(function() {
          //haetaan jokainen tag theatrearea ja niiden sisältä 'name' ja 'id'
          let theatreText = $(this).find('Name').text();
          let theatreID = $(this).find('ID').text();
          //tulostetaan select tauluun sisällöt
          $("#theatreList").append('<option value = ' + theatreID + '>' + theatreText + '</option>');
        });
    }
  });
});

   //funktio joka hakee finnkinon sivulta sen teatterin elokuva aikataulut minkä käyttäjä valitsee
$("#theatreList").change(function(){
  $("#list").text("");
  let id = $("#theatreList").val();
  $("#userInput").css("display", "block"); 
  $("#list").hide();
  $("#list").append('<tr><th>' + '</th><th>' + "Elokuva" + '</th><th>' + '</th><th>' + "Genre" + '</th><th>' + "Kesto" + '</th><th>' + "Alkamisaika" + '</th><th>' + "Sali" + '</th</tr>');
  $("#list").fadeIn(500);

  //Elokuvan tietojen ajax kutsu
  $.ajax({
    url: "https://www.finnkino.fi/xml/Schedule/?area=" + id,
    type: "GET",
    dataType: "html",
    success: function(xml) {
      //haetaan xml tiedot looppia hyödyntäen
        $(xml).find('Show').each(function() {

          //tallennetaan eri tiedot muuttujiin
          let imageURL = '<img class="images" src="' + $(this).find('EventSmallImagePortrait').text() + '">';
          let movie = $(this).find('Title').text();
          let Genre = $(this).find('Genres').text();
          let Schedule = $(this).find('dttmShowStart').text();
          let Duration = $(this).find('LengthInMinutes').text();
          let place = $(this).find("TheatreAuditorium").text();  

          //parsitaan xml:stä vain tarvittavat aikataulutiedot
          let time = Schedule.slice(11, 16);

         //lopullinen tulostus tauluun
          $("#list").hide();
          $("#list").append('<tr><td>'+ imageURL + '</td><th>' + movie + '<th><td>' + Genre + '</td><td>' + Duration + " min </td><td>" + time + '</td><td>' + place + '</td></tr>');
          $("#list").fadeIn(400);
          $("#topbutton").hide();
          $("#topbutton").append(); 
          $("#topbutton").fadeIn(500);
        });
    }
  });
});

//Erillisen hakukentän funktiot
$("#userInput").keyup(function(){
  //Määritellään muuttujat 
 let input = $("#userInput").val();
 let filter = input.toUpperCase();
 let table = $("#list");

 // Looppi listan kohteiden läpi ja piilotetaan kaikki ne kohteet jotka ei vastaa hakulauseketta
 $(table).find('tr').each(function() {
   let tdText = $(this).text();
   if(tdText.toUpperCase().indexOf(filter) > -1 ) {
     $(this).fadeIn(1000);
   } else {
     $(this).fadeOut(1000);
   }
 });
});