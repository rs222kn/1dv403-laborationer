"use strict";

window.onload = function(){
    console.log("Start");
    
    var desktopt = new Desktop();
    
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album"); // laddar apparna
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album");
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album");
    
}