var sleepTime = -1;
var displayIndef = false;
var timer;
var noteID;
var fileName = "sounds/Aurora.mp3";
var noteType = "both";

var opt = {
  type: "basic",
  title: "Drink Water!",
  message: "Time to have some water!",
  iconUrl: "images/noteImage.png",
  requireInteraction: false
}

function onStartGo(){
	chrome.storage.sync.get(["time","soundName"],function(obj){
		var name = obj.soundName;
		if(name != undefined){
			fileName = name;
		}
		var time = obj.time;
		if(time != undefined && time != -1){
			sleepTime = time * 60000;
			remind();
		}
	});
}

function go(mins){
	var found = false;
	sleepTime = mins * 60000;
	saveTime(mins);
	remind();
}

function remind(){
	if(timer)clearTimeout(timer);
	var audio = new Audio(fileName);
	if(noteType != "Visual"){
		audio.play();
	}
	if(noteType != "Audio"){
		opt.requireInteraction = displayIndef;
		if(noteID != undefined){
			chrome.notifications.clear(noteID);
		}
		chrome.notifications.create(opt, function(id){noteID = id;});
	}
	timer = setTimeout(remind,sleepTime);
}

function stop(){
	if(timer){
		clearTimeout(timer);
		saveTime(-1);
	}
	if(noteID != undefined){
		chrome.notifications.clear(noteID);
	}
}

function saveTime(time){
	chrome.storage.sync.set({"time": time});
}

function setOpts(name){
	fileName = name;
	chrome.storage.sync.set({"soundName": name});
}

onStartGo();