"use strict";

function Aimessage(text){
    var doc = {
        btn: document.getElementById("send"),
        txt: document.getElementById("txt"),
        antmess: document.getElementById("antMessage"),
        div: document.getElementById("messagearea")
    };
    
    var createElemnts = {
        newMessege: document.createElement("div"), // div taggarna medelanderna kommer va i
        text: document.createElement("p"), // medelande texten
        pdate: document.createElement("p"), // datum tiden
        imgRemove: document.createElement("img"), // ta bort knapp/bilden
        imgDate: document.createElement("img")
    };
    
    // text
    createElemnts.text.innerHTML = text;
    
    // class
    createElemnts.text.setAttribute("class", "messageText");
    createElemnts.pdate.setAttribute("class", "pdate");
    createElemnts.newMessege.setAttribute("class" ,"aimessage");
    createElemnts.imgRemove.setAttribute("class", "imgBtn");
    createElemnts.imgDate.setAttribute("class", "imgBtn");
    
    // render 
    doc.div.appendChild(createElemnts.newMessege);
    createElemnts.newMessege.appendChild(createElemnts.text);
    createElemnts.newMessege.appendChild(createElemnts.pdate);
}