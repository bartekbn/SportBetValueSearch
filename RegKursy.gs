function downloadHTML(url) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za pobranie kodu źródłowego strony z linku url
  Input - (url - link url adresu strony do pobrania)
  Output - (html - kod źródłowy HTML strony)
  -------------------------------------------------------------------------*/
  var html = "";
  
  html = UrlFetchApp.fetch(url).getContentText();
  
  return html
  
}

function splitMyHTML(sourceCode, flags) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za podział source HTML do postaci kursów
  Input - sourceCode (zmienna z kodem źródłowym)
        - flags (znacznik od którego zaczniemy podział [drużynaA - drużynaB]
  Output - tablica z kursami
  -------------------------------------------------------------------------*/
  // Podział Source HTML (wycinka) i zastosowanie wyjątku na te mecze gdzie kursów jest brak lub mecze już się odbyły
  try {
    var string1 = sourceCode.split(flags)[1];                                      // wszystko za flaga
    var string2 = string1.split('<td class="table-main__datetime">')[0];           // wszystko przed znacznikiem ...'<td class="table-main__datetime">'
    var string3 = string2.split('title="Add to My Selections" data-odd="');        // podział i zapis w tablicy
  
  // Wycięcie kursów 
    var kurs1 = string3[1].split('"></a></td>')[0];
    var kursX = string3[2].split('"></a></td>')[0];
    var kurs2 = string3[3].split('"></a></td>')[0];
  }
  catch (e) {
    var kurs1 = 0;
    var kursX = 0;
    var kurs2 = 0;    
  }

  // Utworzenie tablicy wyjściowej z kursami
  var arrKursy = [];
  arrKursy[0] = kurs1;
  arrKursy[1] = kursX;
  arrKursy[2] = kurs2;

  return arrKursy 

}


function writeKursyToTabela(row, tmpArray) {
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
  targetTabela.getRange(row1,16).setValue(Number(tmpArray[0])); //Kurs na Gospodarz - 1
  targetTabela.getRange(row1,17).setValue(Number(tmpArray[1])); //Kurs na Remis - x
  targetTabela.getRange(row1,18).setValue(Number(tmpArray[2])); //Kurs na Gość - 2
 
}







