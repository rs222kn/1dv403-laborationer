"use strict";

window.onload = function(){
    console.log("Start");
    
    var desktopt = new Desktop();
    
    /* laddar apparna */
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album"); 
    desktopt.loadApp("pic/memory.png", Memory, "Memory");
    desktopt.loadApp("pic/rss.png", Rss, "Rss");
 
};