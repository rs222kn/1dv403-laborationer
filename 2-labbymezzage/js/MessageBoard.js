"use strict";

window.onload = function(){

    var doc = {
        btn: document.getElementById("send"),
        txt: document.getElementById("txt"),
        antmess: document.getElementById("antMessage"),
        div: document.getElementById("board")
    }
    
    var MessageBoard = {
        
        messages: [],
        
        init: function(e){
            MessageBoard.messages.push(new Message(e, new Date()));
            console.log(MessageBoard.messages[0].getText());
            console.log(MessageBoard.messages);
            MessageBoard.renderMessage(MessageBoard.messages.length);
        },
        renderMessages: function(){
            
        },
        renderMessage: function(messageID){
            console.log("renderMessage :" + messageID);
            
            doc.antmess.innerHTML = "antal medelanden : " + messageID; // skriver ut antal medelanden.
            var createElemnts = {
                newMessege: document.createElement("div"), // div taggarna medelanderna kommer va i
                text: document.createElement("p"), // medelande texten
                pdate: document.createElement("p"), // datum tiden
                imgRemove: document.createElement("img"), // ta bort knapp/bilden
                imgDate: document.createElement("img")
            }
            // text
            createElemnts.text.innerHTML = MessageBoard.messages[messageID -1].getHTMLText();
            createElemnts.pdate.innerHTML = MessageBoard.messages[messageID -1].getDateText();
            
            // img
            createElemnts.imgRemove.setAttribute("src", "img/delete.png"); // addar img bilden till imgRemove
            createElemnts.imgRemove.setAttribute("alt", "red img button");
            createElemnts.imgDate.setAttribute("src", "img/clock.png");
            createElemnts.imgDate.setAttribute("alt", "img of a smal clock");
            
            // class
            createElemnts.pdate.setAttribute("class", "pdate");
            createElemnts.newMessege.setAttribute("class" ,"message");
            
            // render 
            doc.div.appendChild(createElemnts.newMessege);
            createElemnts.newMessege.appendChild(createElemnts.text);
            createElemnts.newMessege.appendChild(createElemnts.pdate);
            createElemnts.newMessege.appendChild(createElemnts.imgDate);
            createElemnts.newMessege.appendChild(createElemnts.imgRemove);
            
            // mouse click
            createElemnts.imgRemove.addEventListener("click", function(){ // mouse-click på imgRemove
                console.log("img remove tryck");
            });
            
            createElemnts.imgDate.addEventListener("click", function(){ // mouse-click på imgRemove
                console.log("img clock tryck");
               alert(MessageBoard.messages[messageID -1].getDate());
            });
        },
        removeMessage: function(messageID){
            MessageBoard.messages.splice(messageID, 1);
        }
    };
    
    
    
            
    //btn.onClick = MessageBoard.btnClick();
    doc.btn.addEventListener("click", function(){
            
        MessageBoard.init(doc.txt.value);
    });    
};