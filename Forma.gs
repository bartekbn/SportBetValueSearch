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

function splitMyHTMLForm(sourceCode, flags) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za wyciecie linków do odpowiednich Tabel
  Input - sourceCode (zmienna z kodem źródłowym)
        - flags (znacznik od którego zaczniemy podział [link]
  Output - link do Overall z tabela pozycji w lidze
  -------------------------------------------------------------------------*/
  
  // Podział Source HTML (wycinka) i zastosowanie wyjątku na te zdarzenia gdzie brak tabeli Summary
  try {
    var string1 = sourceCode.split(flags)[1];   
    var string2 = string1.split('</a></span></li><li class="stats-menu-over_under li2">')[0];   // wszystko przed znacznikiem ...'<Overall</a></span>'
    var string3 = string2.split('</a></span>');
    //Logger.log(string3);
    //Logger.log("-------------");
    
    // Wycięcie linku Form 
    var stringForm = string3[1].split('">Form');  
    var linkPartForm = stringForm[0].split('<a href="')[1];
    
    // Utworzenie pełnych linków Url
    var linkForm = ('https://www.betexplorer.com/' + linkPartForm);  
    
    // Utworzenie tablicy z linkami
    var arayLink = [];
    arayLink[0] = linkForm;
    

  }
  catch (e) {
    var linkForm = 0;    

    
  }
  
  //Logger.log("OVERALL: " + linkOverall + "/n");// wszystko za flaga
  return arayLink

}


// Nowa funkja która podzieli nowy html z abela form
