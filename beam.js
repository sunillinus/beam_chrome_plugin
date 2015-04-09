
function menuOnClick(info, tab) {
  // alert('menuOnClick: ' + JSON.stringify(info));
  var menuItem = menuIds[info.menuItemId];
  var data = null;
  if (menuItem == 'page') {
    data = info['pageUrl'];
  } else if (menuItem == 'link') {
    data = info['linkUrl'];
  } else if (menuItem == 'selection') {
    data = info['selectionText'];
  } else if (menuItem == 'image') {
    data = info['srcUrl'];
  }

  chrome.tabs.sendRequest(tab.id, {data: data, type: menuItem}, function(clickedEl) {
    // alert('chrome.tabs.sendRequest');
    // console.log('chrome.tabs.sendRequest');
  	// alert(clickedEl);
    // elt.value = clickedEl.value;
    // alert(elt.value);
  });
}

var menuIds = {};
var contexts = ["page","selection","link","editable","image","video","audio"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Beam " + context;
  var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": menuOnClick});
  menuIds[id] = context;
}
