"use strict";

window.onload = function(){
    console.log("Start");
    
    var desktopt = new Desktop();
    
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album"); // laddar apparna
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album");
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album");
    
    
    var box = document.querySelector(".myBox").addEventListener("mousedown", getPosition, false);
    
    function getPosition(event)
	{
	  var x = event.x;
	  var y = event.y;

	  var canvas = document.querySelector(".myBox");

	  x -= canvas.offsetLeft;
	  y -= canvas.offsetTop;

	  console.log("x:" + x + " y:" + y);
	}
    
}