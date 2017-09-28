function doPost(e) { // Google App Script 以 doGet 接收 GET 請求，以 doPost 接收 POST 請求
  var params = e.parameters;
  var content = params.content;
  var time = Date();
  
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/----/edit?usp=drive_web'); // 試算表的頁面
  var sheet = spreadsheet.getSheetByName('工作表1'); // 試算表的名稱

  // 將資料新增在文件尾部
  var lastrow = sheet.getLastRow() + 1; 
  sheet.getRange(lastrow, 1).setValue(content);
  sheet.getRange(lastrow, 2).setValue(time);

  var url = 'https://graph.facebook.com/v2.8/me/feed?access_token=----';
  var data = 'message='+content;
  var options = {
    'method': 'post',
    'payload': data
  };
  var fbres = JSON.parse(UrlFetchApp.fetch(url, options));

  sheet.getRange(lastrow, 3).setValue(fbres.id);
  return ContentService.createTextOutput('ok');
}
