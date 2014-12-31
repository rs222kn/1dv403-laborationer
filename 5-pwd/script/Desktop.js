"use strict";

function Desktop(){
    console.log("Desktop");
    this.content = document.querySelector("#desktop");
}

Desktop.prototype.loadApp = function (icon, app, name) {

    
    console.log("Desktop prototype");
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
    
    a.addEventListener("click", function () {
        new app(new Window(icon, that, name)); // skickar information till app
    });
};

