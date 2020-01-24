function myRun() {
  
  // Zmienne na potrzeby głównego programu
  var ileWierszy = calculateRow()
  var arrayMatch = [];
  var arrayFixtures = [];
  
  // Zapis danych do arkusza Tabela
  var targetTabela = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabela");
  
  
  // Wyczyszczenie obszarów roboczych
  deleteMyRow(); //przed wypełnieniem arkusza nowymi kursami wykasuj poprzednie dane
  Logger.clear();
  
  
  // Główna pętla programu
  for (var i = 1; i <= ileWierszy; i++) {
    
    Logger.clear(); // tymczasowo
    
    //___1.**** Odczytanie danych z arkusza Source i zapis do arkusza Tabela****///
    arrayMatch = readDataFromSource(i); 
  
    ///**** Zapisanie danych do arkusza Tabela ****///
    writeDataToTabela(i, arrayMatch)
    
    //___2.**** Pobieranie kodu źródłoweo strony Fixtures****/// 
    var tmpHtmlFixtures = downloadHTML(arrayMatch[8]);  
    
    //**** Podział kodu HTML strony fixtures na pojedyńcze mecze i zapis do tablicy ****/// 
    //var arrayFixtures = [];
    //arrayFixtures = splitHTMLFixtures(tmpHtmlFixtures);
    
    //**** Podział kodu HTML ze względu na szukany ciąg znaków 
    // Tworzenie szukanego ciągu znaków
    var arrayTeam = [];
    var teamA, teamB = ""
    arrayTeam = arrayMatch[6].split(" - ");
    teamA = arrayTeam[0]; //Gospodarz
    teamB = arrayTeam[1]; //Gość
    var tmpSzukajString = ("<span>" + teamA + "</span> - <span>" + teamB + "</span>");
    // Podział HTML krok po kroku wycięcie linków przy użyciu funkcji
    var arrayKursy = splitMyHTML(tmpHtmlFixtures, tmpSzukajString)
    // Wypisanie kursów do arkusza Tabela przy użyciu funkcji
    writeKursyToTabela(i, arrayKursy)
    
    
    //___3.**** Pobieranie linków do strony Tabela Summary Home Away ****///
    var tmpHtmlSummary = downloadHTMLSummary(arrayMatch[8]); 
    
    //**** Podział kodu HTML ze względu na szukany ciąg znaków 
    // Tworzenie szukanego ciągu znaków
    var tmpSzukajString2 = ('id="glib-stats-submenu-table"');
    // Podział HTML krok po kroku wycięcie stringów z linkami do strony z aktualnymi tabelami ligi
    var arrayLinkTabeleLigi = [];
    arrayLinkTabeleLigi = splitMyHTMLSumary(tmpHtmlSummary, tmpSzukajString2)
    //var linkA = createLinkUrl(arrayLinkTabelaLigi[2])
    

    //___4.**** Pobieranie linków do strony Tabela FORM ****///
//    var tmpHtmlForm = downloadHTMLSummary(arrayMatch[8]); 
    
    //**** Podział kodu HTML ze względu na szukany ciąg znaków 
    // Tworzenie szukanego ciągu znaków
//    var tmpSzukajString3 = ('<li class="stats-menu-table li0 first">');
    // Podział HTML krok po kroku wycięcie stringów z linkami do strony z aktualnymi tabelami ligi
//    var arrayLinkTabelaForm = [];
//    arrayLinkTabelaForm = splitMyHTMLForm(tmpHtmlForm, tmpSzukajString3)
    //var linkA = createLinkUrl(arrayLinkTabelaLigi[2])
//    Logger.log(arrayLinkTabelaForm);
    
    
    try {
      //**** (A) Pobieranie kodu źródłoweo strony z Tabelą Summary i zapis do arkusza Tabela****///
      var tmpHtmlTabela = downloadHTMLSummary(arrayLinkTabeleLigi[0]);
      var tmpSzukajTeamA = (teamA + '</a></span></td><td class=');
      var tmpSzukajTeamB = (teamB + '</a></span></td><td class=');
      // Przypisanie pozycji do zmiennej przy użyciu funkcji
      var positionTeamA = splitSearchPosition(tmpHtmlTabela, tmpSzukajTeamA);
      var positionTeamB = splitSearchPosition(tmpHtmlTabela, tmpSzukajTeamB);
      //Logger.log(teamA + " positionTeamA = " + positionTeamA + "---------" + teamB+  " ;positionTeamB = " + positionTeamB );
      // Zapisanie pozycji do arkusza abela przy użyciu funkcji
      writePozycjaWTabeli(i, positionTeamA, positionTeamB)

      //**** (B) Pobieranie kodu źródłoweo strony z Tabelą Home i zapis do arkusza Tabela****///
      var tmpHtmlTabelaHome = downloadHTMLSummary(arrayLinkTabeleLigi[1]);
      var tmpSzukajTeamAHome = (teamA + '</a></span></td><td class='); // 'Genoa</a></span></td><td class='
      // Przypisanie pozycji do zmiennej przy użyciu funkcji
      var positionTeamAHome = splitSearchPosition(tmpHtmlTabelaHome, tmpSzukajTeamAHome);
      // Zapisanie pozycji do arkusza Tabela przy użyciu funkcji  
      writePozycjaWTabeliHome(i, positionTeamAHome)

      //**** (C) Pobieranie kodu źródłoweo strony z Tabelą Away i zapis do arkusza Tabela****///
      var tmpHtmlTabelaAway = downloadHTMLSummary(arrayLinkTabeleLigi[2]);
      var tmpSzukajTeamBAway = (teamB + '</a></span></td><td class='); // 'Genoa</a></span></td><td class='
      // Przypisanie pozycji do zmiennej przy użyciu funkcji
      var positionTeamBAway = splitSearchPosition(tmpHtmlTabelaAway, tmpSzukajTeamBAway);
      // Zapisanie pozycji do arkusza Tabela przy użyciu funkcji  
      writePozycjaWTabeliAway(i, positionTeamBAway)
      
      //**** (D) Pobieranie kodu źródłoweo strony z Tabelą FORM oraz obliczanie aktualnej formy i zapis do arkusza Tabela****///

     
    }
    catch (e) {
 
      try {      
        //**** (A) Pobieranie kodu źródłoweo strony z Tabelą Summary i zapis do arkusza Tabela****///
        var tmpHtmlTabela = downloadHTMLSummary(arrayLinkTabeleLigi[0]);
        var tmpSzukajTeamA = (teamA + '</a></span></td><td class=');
        var tmpSzukajTeamB = (teamB + '</a></span></td><td class=');
        // Przypisanie pozycji do zmiennej przy użyciu funkcji
        var positionTeamA = splitSearchPosition(tmpHtmlTabela, tmpSzukajTeamA);
        var positionTeamB = splitSearchPosition(tmpHtmlTabela, tmpSzukajTeamB);
        //Logger.log(teamA + " positionTeamA = " + positionTeamA + "---------" + teamB+  " ;positionTeamB = " + positionTeamB );
        // Zapisanie pozycji do arkusza abela przy użyciu funkcji
        writePozycjaWTabeli(i, positionTeamA, positionTeamB)
        
        //**** (B) Pobieranie kodu źródłoweo strony z Tabelą Home i zapis do arkusza Tabela****///
        var tmpHtmlTabelaHome = downloadHTMLSummary(arrayLinkTabeleLigi[1]);
        var tmpSzukajTeamAHome = (teamA + '</a></span></td><td class='); // 'Genoa</a></span></td><td class='
        // Przypisanie pozycji do zmiennej przy użyciu funkcji
        var positionTeamAHome = splitSearchPosition(tmpHtmlTabelaHome, tmpSzukajTeamAHome);
        // Zapisanie pozycji do arkusza Tabela przy użyciu funkcji  
        writePozycjaWTabeliHome(i, positionTeamAHome)
        
        //**** (C) Pobieranie kodu źródłoweo strony z Tabelą Away i zapis do arkusza Tabela****///
        var tmpHtmlTabelaAway = downloadHTMLSummary(arrayLinkTabeleLigi[2]);
        var tmpSzukajTeamBAway = (teamB + '</a></span></td><td class='); // 'Genoa</a></span></td><td class='
        // Przypisanie pozycji do zmiennej przy użyciu funkcji
        var positionTeamBAway = splitSearchPosition(tmpHtmlTabelaAway, tmpSzukajTeamBAway);
        // Zapisanie pozycji do arkusza Tabela przy użyciu funkcji  
        writePozycjaWTabeliAway(i, positionTeamBAway)
       }
      catch (e) {
      }      
    }
    
    //___4.**** Sprawdzenie czy można mecz postawić czy też nie przy użyciu funkcji yesOrNo ****///

    // Utworzenie zmiennych wykorzystanych w szacowaniu Yes No 
    var procenty = arrayMatch[7];
    
    yesOrNo(i, procenty, arrayKursy, positionTeamAHome, positionTeamBAway, positionTeamA, positionTeamB);
    
    

    Utilities.sleep(500);

    // Test
    //targetTabela.getRange(i+1,13).setValue(teamA);
    //targetTabela.getRange(i+1,14).setValue(teamB);

    
  } 
  
}








