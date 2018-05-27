var background = chrome.extension.getBackgroundPage (); 

function setTime(e){
	var mins = document.getElementById("notificationSet").value;
	if(isNaN(mins) || mins < 1 || mins > 60){
		document.getElementById("warn").innerHTML="<i><p style='color:red;'> Value must be a number between 1 and 60</p></i>";
		setTimeout(function(){
			document.getElementById("warn").innerHTML="";
		}, 3000);
		
	}
	else{
		background.go(mins);
	}
}

function stop(e){
	background.stop();
	document.getElementById("notificationSet").value = "";
}

function setOpts(){
	var name = document.getElementById("sound").value;
	var type;
	background.setOpts(name, type);
}

window.onload = function(){
	document.getElementById("stopBtn").addEventListener("click", stop);
    document.getElementById("waterBtn").addEventListener("click", setTime);
	document.getElementById("setOpts").addEventListener("click", setOpts);
	chrome.storage.sync.get("time",function(obj){ 
		var time = obj.time;
		if(time != undefined && time != -1){
			document.getElementById("notificationSet").value = time;
		}
	});
	chrome.storage.sync.get(["soundName"],function(obj){
		var name = obj.soundName;
		var keepNote = obj.keepNote;
		if(name != undefined){
			document.getElementById("sound").value = name;
		}
	});
}