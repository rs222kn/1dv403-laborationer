"use strict";

var Bord = {
    
    // inehåller element och variabler:s
    doc: {
        getSubmitBtn: document.getElementById("submit"),
        getPTagQuestion: document.getElementById("question"),
        getInputAnswer: document.getElementById("answer"),
        getPTagResponse: document.getElementById("response"),
        getSection: document.getElementsByTagName("section"),
        getGrid: document.getElementsByTagName("table"),
        getDivResult: document.getElementById("result"),
        
        varXhr: new XMLHttpRequest(),
        varResponse: undefined,
        
        varAttempts: [],
        varTimes: 0,
        varAntQuestions: 0
    },
    
    init: function(){
        
        Bord.xhrQuestion();
    },
    
    // skriver ut Frågor
    printQuestion: function(question){
        Bord.doc.getPTagQuestion.innerHTML = question;    
    },
    
    // Parsar JSON till obj
    response: function(){
        Bord.doc.varResponse = JSON.parse(Bord.doc.varXhr.responseText);
    },

    // hämtar frågorna samt vart man ska skicka svaret 
    xhrQuestion: function(url){
        url = url || "http://vhost3.lnu.se:20080/question/1";
        
        Bord.doc.varXhr.onreadystatechange = function(){
            
            if (Bord.doc.varXhr.readyState === 4) {
                if (Bord.doc.varXhr.status === 200) {
                    
                    Bord.response();
                    Bord.printQuestion(Bord.doc.varResponse.question);
                    Bord.click(Bord.doc.varResponse);
                    Bord.doc.varAntQuestions++; // ökar antalet frågor.
                }
                else{
                    Bord.doc.getPTagResponse.innerHTML = "Oväntat fel!";
                }
            }
        };
        Bord.doc.varXhr.open("GET", url, true);
        Bord.doc.varXhr.send(null);
    },
    
    // skickar svaret och hämtar adressen till nästa fråga
    xhrAnswer: function(url, reId, reAnswer){
        
        Bord.doc.getInputAnswer.value = "";
        // skapar obj som ska JSON.parse:as/skickas som svar till server'n
        var product = {
            id: reId,
            answer: reAnswer
        };
        
        Bord.doc.varXhr.onreadystatechange = function(){
            
            if (Bord.doc.varXhr.readyState === 4) {
                if (Bord.doc.varXhr.status === 200) {
                    Bord.response();
                    
                    // om nextURL inte finns så är spelet slut
                    if(Bord.doc.varResponse.nextURL === undefined){
                        Bord.doc.varAttempts.push({question: Bord.doc.getPTagQuestion.innerHTML, attempt: Bord.doc.varTimes});
                        Bord.doc.varTimes = 0;
                        Bord.gameover();
                    }else{
                        
                        Bord.doc.varAttempts.push({question: Bord.doc.getPTagQuestion.innerHTML, attempt: Bord.doc.varTimes});
                        Bord.doc.varTimes = 0;
                        Bord.xhrQuestion(Bord.doc.varResponse.nextURL);
                        Bord.doc.getPTagResponse.innerHTML = Bord.doc.varResponse.message;
                    }
                    
                }
                else{// om man svarade fel.
                    Bord.doc.varTimes++; // ökar antal försök man gjorde
                    Bord.response();
                    Bord.doc.getPTagResponse.innerHTML = Bord.doc.varResponse.message;
                }
            }
        };
        Bord.doc.varXhr.open("POST", url, true);
        Bord.doc.varXhr.setRequestHeader('Content-Type', 'application/json');
        Bord.doc.varXhr.send(JSON.stringify(product));
    },
    
    // visar resultat när spelet är slut
    gameover: function(){
         
         // skapar tabel med information om frågor och antal försök
         for (var i = 0; i < Bord.doc.varAntQuestions; i++) { // lopar antalet frågor.
            
            var td = document.createElement("tr");
            var a1 = document.createElement("a");
            var a2 = document.createElement("a");
            var br = document.createElement("br");
            
            a2.setAttribute("class","a2");
            a1.innerHTML = "Fråga: " + Bord.doc.varAttempts[i].question;
            a2.innerHTML = "Antal Försök: " + Bord.doc.varAttempts[i].attempt;
            
            td.appendChild(a1);
            td.appendChild(br);
            td.appendChild(a2);
            
            Bord.doc.getGrid[0].appendChild(td);
         }
         
         Bord.doc.getSection[0].setAttribute("class", "hide");
         Bord.doc.getDivResult.removeAttribute("class", "hide");
    },
    
    // hanterar all klick, tex enter och input submit
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
        }
    }
};

window.onload = Bord.init;