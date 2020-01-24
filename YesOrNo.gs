function yesOrNo(row, procent, arrayzKursami, home, away, t1, t2) {
  /*-------------------------------------------------------------------------
  Funkcja odpowiedzialna za odczytanie danych z arkusza o nazwie Sample i 
  jeżeli dane wejściowe pozwalają to ustawienie Yes lub No (przekopiwanie 
  do arkusza Tabela.)
  Input - 
  Output - 
  -------------------------------------------------------------------------*/
  var row1 = row + 1;

  // Aktywny arkusz
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  
  // Odczytanie danych
  var sheetSample = SpreadsheetApp.getActive().getSheetByName('Sample');
  var sheetTabela = SpreadsheetApp.getActive().getSheetByName('Tabela');
  
  // Dane z arkusza sample (pokolorowane komórki)
  var tmpYes = sheetSample.getRange("a1");
  var tmpNo = sheetSample.getRange("a2");
  var noData = sheetSample.getRange("a3");
  
  // kolumna YesNO
  var targetRange = sheetTabela.getRange(row1,20);
  // kolumny z kursami 1x2
  var targetRange1 = sheetTabela.getRange(row1,16);
  var targetRangeX = sheetTabela.getRange(row1,17);
  var targetRange2 = sheetTabela.getRange(row1,18);
  // kolumny z danymi
  var kolA = sheetTabela.getRange(row1,1);
  var kolB = sheetTabela.getRange(row1,2);
  var kolC = sheetTabela.getRange(row1,3);
  var kolD = sheetTabela.getRange(row1,4);
  var kolE = sheetTabela.getRange(row1,5);
  var kolF = sheetTabela.getRange(row1,6);
  var kolG = sheetTabela.getRange(row1,7);
  var kolH = sheetTabela.getRange(row1,8);
  var kolI = sheetTabela.getRange(row1,9);
  var kolJ = sheetTabela.getRange(row1,10);
  var kolK = sheetTabela.getRange(row1,11);
  var kolL = sheetTabela.getRange(row1,12);
  var kolM = sheetTabela.getRange(row1,13);
  var kolN = sheetTabela.getRange(row1,14);
  
  // Przypisanie wartości z kursami
  var kurs1 = Number(arrayzKursami[0]);
  var kursX = Number(arrayzKursami[1]);
  var kurs2 = Number(arrayzKursami[2]);
  // Przypisanie wartosci z pozycją w tabeli Home Away
  var posAHome = Number(home);
  var posBAway = Number(away);
  // Przypisanie wartosci z pozycją w tabeli T.1, T.2
  var posT1 = Number(t1);
  var posT2 = Number(t2);
  //Logger.log(kurs1);

  var postaw = false;
  var niepostaw = false;
  // Obliczenia i przekopiowanie komórek
  
    if ((kurs1 == 0) && (kursX == 0) && (kurs2 == 0)) {
      // zmienna boolean
      var pusty = true;
      // uzupełnienie kolumny YesNo o ----
      targetRange.setValues(noData.getValues());
      noData.copyTo(targetRange, {formatOnly:true})
      // uzupełnienie kolumn z kursami o kolor biały
      targetRange1.setBackgroundColor("#FDFEFE");
      targetRangeX.setBackgroundColor("#FDFEFE");
      targetRange2.setBackgroundColor("#FDFEFE");
      // uzupełnianie kolumn z danymi o kolor biały
      kolA.setBackgroundColor("#FDFEFE");
      kolB.setBackgroundColor("#FDFEFE");
      kolC.setBackgroundColor("#FDFEFE");
      kolD.setBackgroundColor("#FDFEFE");
      kolE.setBackgroundColor("#FDFEFE");
      kolF.setBackgroundColor("#FDFEFE");
      kolG.setBackgroundColor("#FDFEFE");
      kolH.setBackgroundColor("#FDFEFE");
      kolI.setBackgroundColor("#FDFEFE");
      kolJ.setBackgroundColor("#FDFEFE");
      kolK.setBackgroundColor("#FDFEFE");
      kolL.setBackgroundColor("#FDFEFE");      
      kolM.setBackgroundColor("#FDFEFE");
      kolN.setBackgroundColor("#FDFEFE");
 
    }
  
    else {
      if (((kursX >= 3.00) && (kurs1 < kurs2) && (kurs1 > 2.00) && (kurs2 >= 3.00)) || ((kursX >= 3.00) && (kurs2 < kurs1) && (kurs2 >= 2.00) && (kurs1 > 2.60))) {
        // zmienna boolean
        postaw = true;
        // uzupełnienie kolumny YesNo o YES
        targetRange.setValues(tmpYes.getValues());
        tmpYes.copyTo(targetRange, {formatOnly:true})
        // uzupełnienie kolumn z kursami o kolor zielony jasny
        targetRange1.setBackgroundColor("#E8F6F3");
        targetRangeX.setBackgroundColor("#E8F6F3");
        targetRange2.setBackgroundColor("#E8F6F3");
        // uzupełnianie kolumn z danymi o kolor zielony jasny
        kolA.setBackgroundColor("#E8F6F3");
        kolB.setBackgroundColor("#E8F6F3");
        kolC.setBackgroundColor("#E8F6F3");
        kolD.setBackgroundColor("#E8F6F3");
        kolE.setBackgroundColor("#E8F6F3");
        kolF.setBackgroundColor("#E8F6F3");
        kolG.setBackgroundColor("#E8F6F3");
        kolH.setBackgroundColor("#E8F6F3");
        kolI.setBackgroundColor("#E8F6F3");
        kolJ.setBackgroundColor("#E8F6F3");
        kolK.setBackgroundColor("#E8F6F3");
        kolL.setBackgroundColor("#E8F6F3");      
        kolM.setBackgroundColor("#E8F6F3");
        kolN.setBackgroundColor("#E8F6F3");
        
        // Kolorowanie kursu, który nalezy obstawić
        if (kurs1 > kurs2) {
          targetRange1.setBackgroundColor("#98EF97");          
        }
        else {
          targetRange2.setBackgroundColor("#98EF97");
        }
      }
      else {
        // zmienna boolean
        niepostaw = true;
        // uzupełnienie kolumny YesNo o No
        targetRange.setValues(tmpNo.getValues());
        tmpNo.copyTo(targetRange, {formatOnly:true})
        // uzupełnienie kolumn z kursami o kolor biały
        targetRange1.setBackgroundColor("#FDFEFE");
        targetRangeX.setBackgroundColor("#FDFEFE");
        targetRange2.setBackgroundColor("#FDFEFE");
        // uzupełnianie kolumn z danymi o kolor biały
        kolA.setBackgroundColor("#FDFEFE");
        kolB.setBackgroundColor("#FDFEFE");
        kolC.setBackgroundColor("#FDFEFE");
        kolD.setBackgroundColor("#FDFEFE");
        kolE.setBackgroundColor("#FDFEFE");
        kolF.setBackgroundColor("#FDFEFE");
        kolG.setBackgroundColor("#FDFEFE");
        kolH.setBackgroundColor("#FDFEFE");
        kolI.setBackgroundColor("#FDFEFE");
        kolJ.setBackgroundColor("#FDFEFE");
        kolK.setBackgroundColor("#FDFEFE");
        kolL.setBackgroundColor("#FDFEFE");      
        kolM.setBackgroundColor("#FDFEFE");
        kolN.setBackgroundColor("#FDFEFE");
      }
      var spotkanie = false;
      var spotkanie2 = false;
      var minPrzewagaWLidze = 2;
      
      // kolorowanie kolumn Away Home
      if ((postaw == true) && (kurs1 < kurs2) && (posAHome+minPrzewagaWLidze < posBAway)) {
        //Logger.log(posAHome+1);
        spotkanie = true;
        kolK.setBackgroundColor("#F9E79F ");
      }
      else if ((postaw == true) && (kurs1 > kurs2) && (posBAway+minPrzewagaWLidze < posAHome)) {
        spotkanie = true;
        kolL.setBackgroundColor("#F9E79F ");
      }
      
      // kolorowanie kolumn T.1 T.2
      if ((postaw == true) && (kurs1 < kurs2) && (posT1+minPrzewagaWLidze < posT2)) {
        //Logger.log(posAHome+1);
        spotkanie2 = true;
        kolI.setBackgroundColor("#F5CBA7");
      }
      else if ((postaw == true) && (kurs1 > kurs2) && (posT2+minPrzewagaWLidze < posT1)) {
        spotkanie2 = true;
        kolJ.setBackgroundColor("#F5CBA7");
      }
      
      // Kolorowanie kolumny ze spotkaniem
      if ((spotkanie == true) && (spotkanie2 == true)) {
        kolF.setBackgroundColor("#AED6F1 ");
      }

    }
   
  
  
}
