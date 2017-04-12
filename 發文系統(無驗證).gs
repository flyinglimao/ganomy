function doPost(e) {
  var params = e.parameters;
  var content = params.content;
  var time = Date();
  
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1YVWhqgdK5LXMmtTY6b0y3BgUcKpvXXcXeUa_dCap3AA/edit?usp=drive_web');
  var sheet = spreadsheet.getSheetByName('工作表1');

  var lastrow = sheet.getLastRow() + 1;
  sheet.getRange(lastrow, 1).setValue(content);
  sheet.getRange(lastrow, 2).setValue(time);

  var url = 'https://graph.facebook.com/v2.8/me/feed?access_token=EAAEawGqv29YBAHsfEC0TPw1jsN75ZB3kfgonRUKkJslfxtxF2yfeUIRM5UxkZASxPbjiqeMO92aOpqq9Ns8psRli4ZCkMIgOQInRKA8LZAZBwSYs3h2x6DqLHeMeQftx7taFsOLskZAOofVVB6jfoawOkhbmCQhxWXsrn8ZAwt1YwZDZD';
  var data = 'message='+content;
  var options = {
    'method': 'post',
    'payload': data
  }
  var fbres = JSON.parse(UrlFetchApp.fetch(url, options));

  sheet.getRange(lastrow, 3).setValue(fbres.id);
  return ContentService.createTextOutput('ok');
}
