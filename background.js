

chrome.extension.getVersion = function() { 
  if (!chrome.extension.version_) { 
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", chrome.extension.getURL('manifest.json'), false); 
    xhr.onreadystatechange = function() { 
      if (this.readyState == 4) { 
        var manifest = JSON.parse(this.responseText); 
        chrome.extension.version_ = manifest.version; 
      } 
   }; 
   xhr.send(); 
 } 
 return chrome.extension.version_; 
}


document.addEventListener('DOMContentLoaded',  function(e) {
	var old_ver = ( localStorage["version"] || "" ).split(".");
	var new_ver = (chrome.extension.getVersion() + "").split(".");
	
	if(old_ver[0]+'.'+old_ver[1]+'.'+old_ver[2] != new_ver[0]+'.'+new_ver[1]+'.'+new_ver[2]){
		chrome.tabs.getAllInWindow(undefined, function(tabs) {
			for (var i = 0, tab; tab = tabs[i]; i++) {
				var str = tab.url;
				if (str.match('dekuyou.ddo.jp/knowledge/')) { 
					chrome.tabs.update(tab.id, {selected: true});
					return;
				}
			}
			chrome.tabs.create({url:'http://dekuyou.ddo.jp/knowledge/?chrome/extensions'});
		});
		
		localStorage["version"] = chrome.extension.getVersion();
		
		// 255, 0, 0 red
		chrome.browserAction.setBadgeText({text:"new!"});
		chrome.browserAction.setBadgeBackgroundColor({color:[0,255,255, 255]});
		
	}
}, false);



var i = 0;

function doScroll(tab, speed, badge) {
  chrome.browserAction.setBadgeText({text:badge});

  wN2scRl = setInterval(function(){
		upurl(tab.id);
	}, speed);
  
  // var upUrl = "javascript:var wN2scRl;Sa5gNA9k=new Function('clearTimeout(wN2scRl)');document.onkeydown=Sa5gNA9k;Sa5gNA9k();void(wN2scRl=setInterval('if(pageYOffset<document.height-innerHeight){window.scrollBy(0,1)}else{Sa5gNA9k()}',"+speed+"))";
  // if(upUrl != tab.url) {
  //   chrome.tabs.update(tab.id, {'url': upUrl});
  // }
}
function upurl(id){
	chrome.tabs.update(id, {'url': 'javascript:document.body.scrollTop+=1;'});
}

function doScrollGoogleReader(tab, speed, badge) {
  chrome.browserAction.setBadgeText({text:badge});

    wN2scRl = setInterval('upurlg('+tab.id+');', speed);

	
}
var wN2scRl;

function upurlg(id){
	chrome.tabs.update(id, {'url': 'javascript:document.getElementById("viewer-entries-container").scrollTop+=1;'});
}



function doStop(tab) {
  chrome.browserAction.setBadgeText({text:""});
  var upUrl = "javascript:var wN2scRl;Sa5gNA9k=new Function('clearTimeout(wN2scRl)');document.onkeydown=Sa5gNA9k;Sa5gNA9k();void(wN2scRl=setInterval('if(pageYOffset<document.height-innerHeight){window.scrollBy(0,0)}else{Sa5gNA9k()}',0))";
  if(upUrl != tab.url) {
    chrome.tabs.update(tab.id, {'url': upUrl});
  }
 
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {

	if(i != 0){
		chrome.tabs.getSelected(null, function(tab){
		  clearInterval(wN2scRl);
			doStop(tab);
		});
		
		i = 0;
	}
	sendResponse();
}); 

function doPageStop(){


}



chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.browserAction.setBadgeBackgroundColor({color:[255,0,0, 255]});




	var checkloginpage = tab.url.indexOf("/reader/view/", 0);
	
  clearInterval(wN2scRl);
	
  if(i == 0){
	i +=1;
	if(checkloginpage >=0 ){
		doScrollGoogleReader(tab, 50, '1');
	}else{
		doScroll(tab, 50, '1');
	}
  }else if(i == 1){
	i +=1;
	if(checkloginpage >=0 ){
		doScrollGoogleReader(tab, 15, '2');
	}else{
		doScroll(tab, 15, '2');
	}
  }else if(i == 2){
	i +=1;
	if(checkloginpage >=0 ){
		doScrollGoogleReader(tab, 1, '3');
	}else{
		doScroll(tab, 1, '3');
	}
  }else if(i == 3){
	i = 0;
	doStop(tab);
		
  }  
});
 

chrome.tabs.onSelectionChanged.addListener(function(tabid, selectinfo) {

	// console.log("tabId:" + tabid);
    clearInterval(wN2scRl);
	chrome.browserAction.setBadgeText({text:""});
	i=0;	
	

});


