//Kun body latautuu se hakee finnkinon teatterit ja sijoittaa ne select listaan
function loadAreas() {
    //Lähettää datapyynnön 
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true); //luodaan yhteys xml tiedostoon 
    xmlhttp.send();
  
    //tarkistetaan että kaikki on ok
    xmlhttp.onreadystatechange=function() { 
      if(xmlhttp.readyState == 4 && xmlhttp.status==200) {

        //Tallenna vastauksen data muuttujaan käsittelyn helpottamiseksi
        let xmlDoc = xmlhttp.responseXML;

        //Käytetään "getElementsByTagName" jotta saadaan teatteri nimet ja id:eet 
        var theatreNames = xmlDoc.getElementsByTagName("Name");
        var theatreIDs = xmlDoc.getElementsByTagName("ID");
  
        //Looppi array listan läpi
        for(var i = 0; i < theatreNames.length; i++) {

          //Saadaan tekstiä xml tiedostoista
          var theatreText = theatreNames[i].innerHTML;
          var theatreID = theatreIDs[i].innerHTML;
  
          //Luo uuden option select listalle ja antaa arvoksi theatreID xml tiedostosta
          document.getElementById("theatreList").innerHTML +=  '<option value = ' + theatreID + '>' + theatreText + '</option>';
        }
      }
    }
  }

// funktio joka hakee finnkinon sivulta sen teatterin elokuva aikataulut minkä käyttäjä valitsee
function loadSchedule() {

    // tyhjentää listan jotta olemassaolevan datan päälle ei tulostu uutta dataa 
    document.getElementById("list").innerHTML = "";
    
    //Saa valitun teatterin id:een 
    let id = document.getElementById("theatreList").value;
    
    //Lähettää pyynnön, käyttää sen teatterin id:eetä jolta haluaa saada dataa
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + id, true);
    xmlhttp.send()

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
        let xmlDoc = xmlhttp.responseXML; //varastoidaan xml data muuttujaan jotta sitä voidaan käyttää myöhemmin
    
        let movie = xmlDoc.getElementsByTagName("Title"); //xml tiedostosta saatu data asetetaan muuttujiin ja ne näytetään sivulla
        let genre = xmlDoc.getElementsByTagName("Genres");
        let picture = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
        let timetable = xmlDoc.getElementsByTagName("dttmShowStart");
        let lengthmin = xmlDoc.getElementsByTagName("LengthInMinutes");
        let place = xmlDoc.getElementsByTagName("TheatreAuditorium");   
    
        let add = "<table id='movie-list'>"; //Taulukon alku
        add+= "<tr><th></th> <th>Elokuva</th><th>Genre</th> <th>Kesto</th><th>Alkamisaika</th> <th>Sali</th>"; //Määritellään taulukon otsikot 
    
        for (let i=0; i < movie.length; i++){ //loopataan data yhdestä teatterista jotta joka rivillä on tietoa yhdestä elokuvasta ja näytösajasta 
    
        let time = new Date(timetable[i].innerHTML);  //muotoillaan näytösajan data merkkijonosta päivämääräksi
        add += '<tr>'; //lisätään rivejä taulukkoon 
        add += '<td><img src="'+picture[i].innerHTML+'"></td>'; //lisätään kuva taulukon sisään 
        add += '<td class="movietitle">' + movie[i].innerHTML + '</td>';
        add += '<td>' + genre[i].innerHTML + '</td>';
        add += '<td>' + lengthmin[i].innerHTML+ " min " +'</td>';
        add += '<td>' + time.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})+'</td>'; // muutetaan päivämäärän formaattia näyttääkseen vain kellonajan
        add += '<td>' + place[i].innerHTML+'</td>';
        add += '</tr>';
    
        }
        // Taulukon loppu
        add+="</table>";
    
        // Asetetaan taulukko "moviedata" diviin 
        document.getElementById("moviedata").innerHTML = add;
        document.getElementById("topbutton").style.display=""; 
                }
            }
        }