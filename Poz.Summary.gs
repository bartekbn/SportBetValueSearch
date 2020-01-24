function downloadHTMLSummary(url) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za pobranie kodu źródłowego ligi tzw. Summary
  Input - (url - link url adresu strony do prerobienia i pobrania)
  Output - (html - kod źródłowy HTML strony)
  -------------------------------------------------------------------------*/
  // Konwersja Linku url na fixtures
  var html = "";
  var tmpUrl = "";
  //var url = 'https://www.betexplorer.com/soccer/argentina/superliga/fixtures/'
  tmpUrl = url.toString().replace("fixtures/", "");

  // Pobranie kodu źródłowego strony
  html = UrlFetchApp.fetch(tmpUrl).getContentText();
  //Logger.log(tmpUrl);
  return html
  
}

function splitMyHTMLSumary(sourceCode, flags) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za wyciecie linków do odpowiednich Tabel
  Input - sourceCode (zmienna z kodem źródłowym)
        - flags (znacznik od którego zaczniemy podział [link]
  Output - link do Overall z tabela pozycji w lidze
  -------------------------------------------------------------------------*/
  
  // Podział Source HTML (wycinka) i zastosowanie wyjątku na te zdarzenia gdzie brak tabeli Summary
  try {
    var string1 = sourceCode.split(flags)[1];   
    var string2 = string1.split('</a></span></li></ul></div><div id="glib-stats-submenu-form"')[0];   // wszystko przed znacznikiem ...'<Overall</a></span>'
    var string3 = string2.split('<div class="submenu-container">')[0];
    var string4 = string3.split('</a></span>');
    //Logger.log(string4);
    //Logger.log("-------------");
    
    // Wycięcie linku Overall 
    var stringOverall = string4[0].split('">Overall');  
    var linkPartOverall = stringOverall[0].split('<a href="')[1];
    
    // Wycięcie linku Home
    var stringHome = string4[1].split('">Home');
    var linkPartHome = stringHome[0].split('<a href="')[1];
    
    // Wycięcie linku Away
    var stringAway = string4[2].split('">Away');
    var linkPartAway = stringAway[0].split('<a href="')[1];

    // Utworzenie pełnych linków Url
    var linkOverall = ('https://www.betexplorer.com/' + linkPartOverall);  
    var linkHome = ('https://www.betexplorer.com/' + linkPartHome); 
    var linkAway = ('https://www.betexplorer.com/' + linkPartAway); 
    
    // Utworzenie tablicy z linkami
    var arayLink = [];
    arayLink[0] = linkOverall;
    arayLink[1] = linkHome;
    arayLink[2] = linkAway;
    

  }
  catch (e) {
    var linkOverall = 0;    
    var linkHome = 0;
    var linkAway = 0;
    
  }
  
  //Logger.log("OVERALL: " + linkOverall + "/n");// wszystko za flaga
  return arayLink

}

function splitSearchPosition(sourceCode, flags) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za podział source HTML do postaci pozycji drużyny w lidze
  Input - sourceCode (zmienna z kodem źródłowym)
        - flags (znacznik od którego zaczniemy podział [drużynaA]
  Output - pozycja w tabeli
  -------------------------------------------------------------------------*/
  
  // Podział Source HTML (wycinka) i zastosowanie wyjątku na te mecze gdzie kursów jest brak lub mecze już się odbyły
  try {
    var string1 = sourceCode.split(flags)[0]; 
    //Logger.log((string1))
    var string2 = string1.split('data-def-order="');   // wszystko przed znacznikiem ...'<Overall</a></span>' 
    //Logger.log((string2.length))
    var longArrayStr2 = string2.length-1;
    //Logger.log(longArrayStr2);// wszystko za flaga
    // Logger.log((string2[1]));// wszystko za flaga
    var string3 = string2[longArrayStr2].split('</td><td class="form col_form">')[0];
    //Logger.log((string3))   
    var string4 = string3.split('"><td class')[0];
    //Logger.log((string4))  
    var pozycja = parseInt(string4);
    pozycja = pozycja +1;
    //Logger.log(pozycja);// wszystko za flaga

  }
  catch (e) {
    var pozycja = 0;   
  }
  
  //Logger.log(link);// wszystko za flaga
  return pozycja

}



function writePozycjaWTabeli(row, A, B) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za wypisanie danych do arkusza o nazwie Tabela.
  Input - row (parametr int jako numer zapisywanego wiersza)
        - A, B (parametry z pozycją drużyny w Tabeli)
  Output - 
  -------------------------------------------------------------------------*/
  var row1 = row + 1;
  // Zapis danych do arkusza Tabela
  var targetTabela = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabela");
  
  // Utworzenie Stringu i zapisanie do komórki 
  //var ciag = (A + "......" + B)
  targetTabela.getRange(row1,9).setValue(Number(A)); 
  targetTabela.getRange(row1,10).setValue(Number(B));

 
}
