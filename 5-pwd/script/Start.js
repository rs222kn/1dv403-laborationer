"use strict";

window.onload = function(){
    console.log("Start");
    
    var desktopt = new Desktop();
    
    /* laddar apparna ("bild sök väg", "konstruktor", "app namn", "height", "width")*/
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album", 330, 260); 
    desktopt.loadApp("pic/memory.png", Memory, "Memory", 400, 300);
    desktopt.loadApp("pic/rss.png", Rss, "Rss");
 
};