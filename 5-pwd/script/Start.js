"use strict";

var pwd = pwd || {};

pwd.Start = function(){
    
    var desktopt = new pwd.Desktop();
    
    // laddar apparna ("bild sök väg", "konstruktor", "app namn", "height", "width");
    desktopt.loadApp("pic/icon1.png", pwd.ImgViewer, "Foto Album", {menu: false, menuItems: ["",""], menuListText: [[""],[""]], resize: true}, 330, 260);
    desktopt.loadApp("pic/memory.png", pwd.Memory, "Memory", {menu: true,  menuItems: ["Arkiv", "Redigera"], menuListText: [["Test"], ["Starta Om", "Inställningar"]], resize: true}, 330, 300);
    desktopt.loadApp("pic/rss.png", pwd.Rss, "Rss", { menu: true, menuItems: ["Arkiv", "Inställningar"], menuListText: [["hej"], ["Uppdateringsintervall","Välj källa","Uppdatera nu"]], resize: true }, 400, 400);
    desktopt.loadApp("pic/quiz.png", pwd.Quiz, "The Quiz", {menu: false, menuItems: [null, null], menuListText: [[null]], resize: true}, 380, 300);

};

window.onload = pwd.Start;