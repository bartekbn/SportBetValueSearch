function writePozycjaWTabeliAway(row, A) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za wypisanie danych do arkusza o nazwie Tabela kol. Away.
  Input - row (parametr int jako numer zapisywanego wiersza)
        - B (parametr z pozycją drużyny w Tabeli)
  Output - 
  -------------------------------------------------------------------------*/
  var row1 = row + 1;
  // Zapis danych do arkusza Tabela
  var targetTabela = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabela");
  
  // Utworzenie Stringu i zapisanie do komórki 
  //var ciag = (A + "......" + B)
  targetTabela.getRange(row1,12).setValue(Number(A)); 

}
