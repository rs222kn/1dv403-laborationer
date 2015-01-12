"use strict";

pwd.ViewImg = function (obj) {
    
    obj.content.style.backgroundImage = 'url('+obj.icon+')';
    
    // byter bakgrunds bilden på dekstop.
    obj.content.addEventListener("contextmenu", function(e){
       e.preventDefault();
       obj.desktop.content.style.backgroundImage = 'url('+obj.icon+')';
    });
};