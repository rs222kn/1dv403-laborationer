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
    };
    
    // text
    createElemnts.text.innerHTML = text;
    
    // class
    createElemnts.text.setAttribute("class", "aimessageText");
    createElemnts.newMessege.setAttribute("class" ,"aimessage");
    
    // render 
    doc.div.appendChild(createElemnts.newMessege);
    createElemnts.newMessege.appendChild(createElemnts.text);
    createElemnts.newMessege.appendChild(createElemnts.pdate);
}