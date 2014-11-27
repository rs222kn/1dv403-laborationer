"use strict";

window.onload = function(){

    var doc = {
        btn: document.getElementById("send"),
        txt: document.getElementById("txt"),
        antmess: document.getElementById("antMessage"),
        div: document.getElementById("messagearea")
    }
    
    var MessageBoard = {
        
        messages: [],
        
        init: function(e){
            MessageBoard.messages.push(new Message(e, new Date()));
            console.log(MessageBoard.messages[0].getText());
            console.log(MessageBoard.messages);
            MessageBoard.renderMessage(MessageBoard.messages.length -1);
        },
        renderMessages: function(){
            document.getElementById("messagearea").innerHTML = "";
            
            for (var i = 0; i < MessageBoard.messages.length; i++) {
                MessageBoard.renderMessage(i);
            }
        },
        renderMessage: function(messageID){
            var nr = messageID+1; // bugg om man tar bort alla medelanden så står det fortfarande 1
            console.log("renderMessage :" + messageID);
            
            doc.antmess.innerHTML = "antal medelanden : " + nr; // skriver ut antal medelanden.
            
            var createElemnts = {
                newMessege: document.createElement("div"), // div taggarna medelanderna kommer va i
                text: document.createElement("p"), // medelande texten
                pdate: document.createElement("p"), // datum tiden
                imgRemove: document.createElement("img"), // ta bort knapp/bilden
                imgDate: document.createElement("img")
            };
            // text
            createElemnts.text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
            createElemnts.pdate.innerHTML = MessageBoard.messages[messageID].getDateText();
            
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
                var r = confirm("Vill du ta bort medelandet?");
                if(r){
                    MessageBoard.removeMessage(messageID);    
                }
                
            });
            
            createElemnts.imgDate.addEventListener("click", function(){ // mouse-click på imgRemove
                console.log("img clock tryck");
               alert(MessageBoard.messages[messageID].getDate());
            });
        },
        removeMessage: function(messageID){
            MessageBoard.messages.splice(messageID, 1);
            MessageBoard.renderMessages();
        }
    };
    
    //btn.onClick = MessageBoard.btnClick();
    doc.btn.addEventListener("click", function(){
            
        MessageBoard.init(doc.txt.value);
    });    
};