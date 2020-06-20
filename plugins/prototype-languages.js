window.BTBLang = {
  class: globalThis['btblab-languages'].default,
  langLoader: langLoader
}

const config = [
  { index: 'en', label: 'English', dictionary: {} },
  { index: 'zh', label: '繁體中文', dictionary: {} }
];

function langLoader(currentlang, callbackFn) {
  var obj = new XMLHttpRequest();
  obj.overrideMimeType('application/json');
  obj.open('GET', location.origin + location.pathname +'/languages/'+ currentlang +'.json', true);
  obj.onreadystatechange = function () {
    if ((4 == obj.readyState)
        && ('200' == obj.status)
    )
    {
      for(var i=0;i<config.length;i++) {
        if(config[i].index === currentlang)
        {
          config[i].dictionary = JSON.parse(obj.responseText);
          break;
        }
      }
      if(typeof callbackFn == 'function') {
        callbackFn();
      }
      top.document.getElementById('page').src = top.document.getElementById('page').src;
      return JSON.parse(obj.responseText);
    }
  };
  obj.send();
}

globalThis['btblab-languages'].initializer(config);