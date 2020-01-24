function readDataFromSource(row) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za odczytanie danych z arkusza o nazwie Source.
  Input - row (zmienna int jako numer odczytywanego wiersza)
  Output - tmpArrSpotkania (zmienna tablica przechowująca dane spotkania)
  -------------------------------------------------------------------------*/
  var ileWierszy;
  var app = SpreadsheetApp;
  
  // Aktywny arkusz
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  
  // Odczytanie danych z arkusza Source
  var targetSource = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Source");
  
  // Tablica do przechowywania danych na temat spotkania
  var tmpArrSpotkania = [{}];
  
  // Zmienne tymczasowe, odczytanie danych z arkusza
  var tmpId = targetSource.getRange(row, 1).getValue();
  var tmpKraj = targetSource.getRange(row, 16).getValue();
  var tmpLiga = targetSource.getRange(row, 17).getValue();
  var tmpKolejka = targetSource.getRange(row, 5).getValue();
  var tmpG = targetSource.getRange(row, 7).getValue();
  var tmpDataSpotkania = targetSource.getRange(row, 10).getValue();
  var tmpSpotkanie = targetSource.getRange(row, 11).getValue();
  var tmpProcenty = targetSource.getRange(row, 15).getValue();
  var tmpLinkUrl = targetSource.getRange(row, 19).getValue();
  
  // Konwersja Linku url na fixtures
  var tmpUrl = tmpLinkUrl.toString().replace("results", "fixtures");
 
  // Utworzenie z odczytancych danych tablicy z danymi spotkania
  tmpArrSpotkania = [tmpId, tmpKraj, tmpLiga, tmpKolejka, tmpG, tmpDataSpotkania, tmpSpotkanie, tmpProcenty, tmpUrl];
  
  // Zwrócenie tablicy na wyjściu funkcji
  return tmpArrSpotkania;
  
}


function writeDataToTabela(row, tmpArray) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za wypisanie danych do arkusza o nazwie Tabela.
  Input - row (parametr int jako numer zapisywanego wiersza)
        - tmpArray (parametr tablca z danymi spotkania)
  Output - 
  -------------------------------------------------------------------------*/
  var row1 = row + 1;
  // Zapis danych do arkusza Tabela
  var targetTabela = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabela");
  
  // Uporządkowanie danych
  targetTabela.getRange(row1,1).setValue(Number(tmpArray[0])); //Id Spotkania
  targetTabela.getRange(row1,2).setValue(tmpArray[1]); //kraj
  targetTabela.getRange(row1,3).setValue(tmpArray[2]); //Liga
  targetTabela.getRange(row1,4).setValue(Number(tmpArray[4])); //Prawdopodobieństwo G
  targetTabela.getRange(row1,5).setValue(tmpArray[5]); //Data spotkania
  targetTabela.getRange(row1,6).setValue(tmpArray[6]); //Nazwa drużyn
  targetTabela.getRange(row1,7).setValue(Number(tmpArray[3])); //Nr Kolejki
  targetTabela.getRange(row1,8).setValue(Number(tmpArray[7])); //Procent
  
  
  //test
  //targetTabela.getRange(row1,13).setValue(tmpArray[8]); //Procent
  
}




function calculateRow() {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za liczenie ile jest zajętych wierszy w arkuszu Source
  Input - 
  Output - row (zmienna int jako nilość zajętych wierszy)
  -------------------------------------------------------------------------*/
  
  // Aktywny arkusz
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  
  // Odczytanie danych z arkusza Source
  var targetSource = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Source");  
  var range = targetSource.getDataRange();
  var values = range.getValues();
  
  //pętla licząca ilość zajętych wierszy w arkuszu Source
  var row = 0;
  for (var row=0; row<values.length; row++) {
    if (!values[row].join("")) break;
  }
  
  // Zwracam wynik funkcji
  return row
  
}


function deleteMyRow() {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za kasowanie wypełnionych wierszy w arkuszu Tabela
  Input - 
  Output - 
  -------------------------------------------------------------------------*/
  
  // Aktywny arkusz
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  
  // Odczytanie danych z arkusza Source
  var targetSource = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabela");
    
  // Ile Jest wierszy zapełnionych
  var RANGE = targetSource.getDataRange();
  var rangeVals = RANGE.getValues();
  
  // Dodaje jeden dodatkowy wiersz na końcu arkusza
  targetSource.appendRow([""])
  
  // Usunięcie zapełnionych wierszy wszystkich na raz
  targetSource.deleteRows(2, rangeVals.length-1);//usunięcie wierszy od 2 do 500
  
  /*
  // Odwrócona pętla for odpowiedzialna za kasowanie pojedyńczych wierszy z pominięciem pierwszego
  for(var i = rangeVals.length-1; i >= 1; i--){
    if(rangeVals[i]){
      targetSource.deleteRow(i+1);
    }
  }
  */
  
}
