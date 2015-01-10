"use strict";

window.onload = function(){
    
    /*if(navigator.appVersion.indexOf("MSIE 7.")!=-1){
        console.log("hej");
    }
    var ie = (navigator.appName.indexOf("MSIE 11.") != -1);
    console.log(ie);
    */
    
    
    var desktopt = new Desktop();
    
    /* laddar apparna ("bild sök väg", "konstruktor", "app namn", "height", "width")*/
    desktopt.loadApp("pic/icon1.png", ImgViewer, "Foto Album", 330, 260);
    desktopt.loadApp("pic/memory.png", Memory, "Memory", 330, 300);
    desktopt.loadApp("pic/rss.png", Rss, "Rss", 400, 400);
    desktopt.loadApp("pic/quiz.png", Quiz, "The Quiz", 380, 300);
 
};