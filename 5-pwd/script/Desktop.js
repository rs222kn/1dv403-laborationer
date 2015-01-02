"use strict";

function Desktop(){
    console.log("Desktop");
    this.content = document.querySelector("#desktop");
}

// laddar app iconer
Desktop.prototype.loadApp = function (icon, app, name, h, w) {
    console.log("loadApp prototype");
    
    // skapar element
    var a = document.createElement("a");
    var img = document.createElement("img");
    
    // säterr deras atributer
    img.setAttribute('src', icon);
    img.setAttribute("class", "iconProp");
    a.setAttribute("href", "#");

    // lägger trycker ut dom på sidan
    a.appendChild(img);
    document.querySelector("#menu").appendChild(a);
    
    
    var that = this;
    
    // öppnar app på klick
    a.addEventListener("click", function () {
        new app(new Window(icon, that, name, null, h, w)); // skickar information till app
    });
};

// visar bilder i ett separat fönster
Desktop.prototype.loadImg = function(div, url, h, w, icon, app, name){
    console.log("loadImg Prototype");
    var that = this;
    
    new app(new Window(icon, that, name, url, h, w)); // skickar information till app
};
