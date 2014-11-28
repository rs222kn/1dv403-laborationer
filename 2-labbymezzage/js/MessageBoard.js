"use strict";

var MessageBoard = {
    
    doc:{
        btn: document.getElementById("send"),
        txt: document.getElementById("txt"),
        antmess: document.getElementById("antMessage"),
        div: document.getElementById("messagearea"),
        count: 0
    
    },
    
    messages: [],
    
    init: function(e){
        //btn.onClick = MessageBoard.btnClick();
        MessageBoard.doc.btn.addEventListener("click", MessageBoard.creatMessage);
        
        // enter i textarea 
        MessageBoard.doc.txt.onkeypress = function(e){
           if(e.keyCode == 13 && !e.shiftKey){
                MessageBoard.creatMessage();
                MessageBoard.doc.txt.value ='';
            }
            
        };
    },
    // skapar medelandet (knapp tryck)
    creatMessage: function(){
        MessageBoard.messages.push(new Message(MessageBoard.doc.txt.value, new Date()));
        MessageBoard.renderMessage(MessageBoard.messages.length -1);
        MessageBoard.doc.txt.value ='';
    },
    
    renderMessages: function(){
        document.getElementById("messagearea").innerHTML = "";
        
        for (var i = 0; i < MessageBoard.messages.length; i++) {
            MessageBoard.renderMessage(i);
        }
    },
    
    renderAiMessage: function(nr){
        
        setTimeout(function(){
            switch (nr) {
                case 0:
                    new Aimessage("Hej");
                    break;
                case 1:
                    new Aimessage("Chillar runt själv då?");
                    break;
                case 2:
                    new Aimessage("Jaha låter kul!");
                    break;
                case 3:
                    new Aimessage("hehe, Men vart kommer du ifrån då?");
                    break;
                case 4:
                    new Aimessage("Okej kommer själv från Malmö");
                    break;
                case 5:
                    new Aimessage("Har du Snapchat?");
                    break;
                
                default:
                    new Aimessage("...");
            }
        }, 1500);
        
    },
    
    messageCount: function(){
        MessageBoard.doc.antmess.innerHTML = "Antal medelanden: " + MessageBoard.messages.length; // skriver ut antal medelanden.
    },
    renderMessage: function(messageID){
        MessageBoard.messageCount();
        
        var createElemnts = {
            newMessege: document.createElement("div"), // div taggarna medelanderna kommer va i
            text: document.createElement("p"), // medelande texten
            pdate: document.createElement("p"), // datum tiden
            imgRemove: document.createElement("div"), // ta bort knapp/bilden
            imgDate: document.createElement("div")
        };
        // text
        createElemnts.text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        createElemnts.pdate.innerHTML = MessageBoard.messages[messageID].getDateText();
        
        // class / id
        createElemnts.text.setAttribute("class", "messageText");
        createElemnts.pdate.setAttribute("class", "pdate");
        createElemnts.newMessege.setAttribute("class" ,"message");
        createElemnts.imgRemove.setAttribute("class", "imgRemove"); // addar img bilden till imgRemove
        createElemnts.imgDate.setAttribute("class", "imgClock");
        
        // render 
        MessageBoard.doc.div.appendChild(createElemnts.newMessege);
        createElemnts.newMessege.appendChild(createElemnts.imgRemove);
        createElemnts.newMessege.appendChild(createElemnts.imgDate);
        createElemnts.newMessege.appendChild(createElemnts.text);
        createElemnts.newMessege.appendChild(createElemnts.pdate);
        
        // mouse click
        createElemnts.imgRemove.addEventListener("click", function(){ // mouse-click på imgRemove
            var r = confirm("Vill du ta bort medelandet?");
            if(r){
                MessageBoard.removeMessage(messageID);    
            }
        });
        
        createElemnts.imgDate.addEventListener("click", function(){ // mouse-click på imgRemove
            alert(MessageBoard.messages[messageID].getDate());
        });
        
        
        MessageBoard.renderAiMessage(MessageBoard.doc.count);
        MessageBoard.doc.count++;
    },
    removeMessage: function(messageID){
        MessageBoard.messages.splice(messageID, 1);
        MessageBoard.renderMessages();
        MessageBoard.messageCount();
    }
};

window.onload = MessageBoard.init;