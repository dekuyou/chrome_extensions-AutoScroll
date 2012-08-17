

var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded',  function(e) {	

	
	document.getElementById("ver").innerHTML = background.chrome.extension.getVersion();

	init();


	document.getElementById("save_settings").addEventListener('click', save_settings);


}, false);




function viewStatus(str1,str2){
    //
    var status = document.getElementById(str1);
    status.innerHTML = str2;
    setTimeout(function() { status.innerHTML = ""; }, 1 * 1000);


}

function init(){
	document.getElementById("low").value = (localStorage["low"] || "50");
	document.getElementById("second").value = (localStorage["second"] || "15");
	document.getElementById("top").value = (localStorage["top"] || "1");
}


function save_settings() {

	localStorage["low"] = document.getElementById("low").value + "";
	localStorage["second"] = document.getElementById("second").value + "";
	localStorage["top"] = document.getElementById("top").value + "";
	viewStatus("status_settings","Options Saved.");

}

