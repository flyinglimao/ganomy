function debug() {
  var result = doGet({
    'parameters':{
      'content': '這是測試發文1'
    }
  });
  Logger.log('Result: ' + result);
}

