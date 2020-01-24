function splitMyHTMLHome(sourceCode, flags) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za podział source HTML do postaci kursów
  Input - sourceCode (zmienna z kodem źródłowym)
        - flags (znacznik od którego zaczniemy podział [link]
  Output - link do Overall z tabela pozycji w lidze
  -------------------------------------------------------------------------*/
  
  // Podział Source HTML (wycinka) i zastosowanie wyjątku na te zdarzenia gdzie brak tabeli Home
  try {
    var string1 = sourceCode.split(flags)[1];   
    var string2 = string1.split('<Home</a></span>')[0];   // wszystko przed znacznikiem ...'<Home</a></span>'
    var string3 = string2.split('<span><a href="')[1];
    
    // Wycięcie linku Overall 
    var linkPart = string3.split('">Home</a></span>')[0];
    var link = ('https://www.betexplorer.com/' + linkPart);  

  }
  catch (e) {
    var link = 0;   
  }
  
  //Logger.log(link);// wszystko za flaga
  return link

}


function writePozycjaWTabeliHome(row, A) {
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
  targetTabela.getRange(row1,11).setValue(A); 


 
}
