"use strict";

pwd.Desktop = function (){
    this.content = document.querySelector("#desktop");
};

// laddar app iconer
pwd.Desktop.prototype.loadApp = function (icon, app, name, h, w) {
    var that = this, a, img;
    
    // skapar element
    a = document.createElement("a");
    img = document.createElement("img");
    
    // säterr deras atributer
    img.setAttribute('src', icon);
    img.setAttribute("class", "iconProp");
    a.setAttribute("href", "#");

    // trycker ut dom på sidan
    a.appendChild(img);
    document.querySelector("#menu").appendChild(a);
    
    // öppnar app på klick
    a.addEventListener("click", function () {
        new app(new pwd.Window(icon, that, name, null, h, w)); // skickar information till app
    });
};
