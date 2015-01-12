"use strict";

var pwd = pwd || {};

pwd.Start = function(){
    
    var desktopt = new pwd.Desktop();
    
    // laddar apparna ("bild sök väg", "konstruktor", "app namn", "height", "width");
    desktopt.loadApp("pic/icon1.png", pwd.ImgViewer, "Foto Album", 330, 260);
    desktopt.loadApp("pic/memory.png", pwd.Memory, "Memory", 330, 300);
    desktopt.loadApp("pic/rss.png", pwd.Rss, "Rss", 400, 400);
    desktopt.loadApp("pic/quiz.png", pwd.Quiz, "The Quiz", 380, 300);

};

window.onload = pwd.Start;