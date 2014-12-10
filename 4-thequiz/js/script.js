"use strict";

var Bord = {
    
    doc: {
        getSubmitBtn: document.getElementById("submit"),
        getPTagQuestion: document.getElementById("question"),
        getInputAnswer: document.getElementById("answer"),
        getPTagResponse: document.getElementById("response"),
        
        varXhr: new XMLHttpRequest(),
    },
    
    init: function(){
        
        Bord.xhrQuestion();
    },
    
    // skriver ut Frågor
    printQuestion: function(question){
        Bord.doc.getPTagQuestion.innerHTML = question;    
    },
    
    // Får frågorna.. 
    xhrQuestion: function(url){
         url = url || "http://vhost3.lnu.se:20080/question/1";
        
        Bord.doc.varXhr.onreadystatechange = function(){
            if (Bord.doc.varXhr.readyState === 4) {
                if (Bord.doc.varXhr.status === 200) {
                    
                    //Bord.doc.varResponse = JSON.parse(Bord.doc.varXhr.responseText);
                    var response = JSON.parse(Bord.doc.varXhr.responseText);
                    Bord.printQuestion(response.question);
                    Bord.click(response);
                }
                else{
                    Bord.doc.getPTagResponse.innerHTML = "Oväntat fel!";
                }
            }
        };
        Bord.doc.varXhr.open("GET", url, true);
        Bord.doc.varXhr.send(null);
    },
    
    // skickar svar!
    xhrAnswer: function(url, reId, reAnswer){
        
        Bord.doc.getInputAnswer.value = "";
        // skapar obj som ska skickas som svar till server'n
        var product = {
            id: reId,
            answer: reAnswer
        };
        
        Bord.doc.varXhr.onreadystatechange = function(){
            if (Bord.doc.varXhr.readyState === 4) {
                if (Bord.doc.varXhr.status === 200) {
                    var response = JSON.parse(Bord.doc.varXhr.responseText);
                    
                    Bord.xhrQuestion(response.nextURL);
                    Bord.doc.getPTagResponse.innerHTML = response.message;
                }
                else{
                    var response = JSON.parse(Bord.doc.varXhr.responseText);
                    Bord.doc.getPTagResponse.innerHTML = response.message;
                }
            }
        };
        Bord.doc.varXhr.open("POST", url, true);
        Bord.doc.varXhr.setRequestHeader('Content-Type', 'application/json');
        Bord.doc.varXhr.send(JSON.stringify(product));
    },
    
    click: function(response){
        Bord.doc.getSubmitBtn.addEventListener("click", press);
        
         // skicka med enter..
        Bord.doc.getInputAnswer.onkeypress = function(e){
            if(e.keyCode == 13 && !e.shiftKey){
                e.preventDefault();
                press();
            }
        };
        
        function press(){
            //Bord.doc.varXhr.abort();
            Bord.xhrAnswer(response.nextURL, response.id, Bord.doc.getInputAnswer.value);
        };
    },
};

window.onload = Bord.init;
