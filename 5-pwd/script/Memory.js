"use strict";

function Memory(obj){
    
    var main = document.createElement("main");
        var header = document.createElement("header");
        var h1 = document.createElement("h1");
        var section = document.createElement("section");
            var pQuestion = document.createElement("p");
            var inputText = document.createElement("input");
            var inputBtn = document.createElement("input");
            var pResponse = document.createElement("p");
        
        var div = document.createElement("div");
            var table = document.createElement("table");
    
    
    
    pQuestion.setAttribute("class", "question");
    
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "answer");
    inputText.setAttribute("class", "answer");
    inputText.setAttribute("placeholder", "Answer");
    
    inputBtn.setAttribute("type", "submit");
    inputBtn.setAttribute("value", "SEND");
    inputBtn.setAttribute("name", "submit");
    inputText.setAttribute("class", "submit");
    
    pResponse.setAttribute("class", "response");
    
    div.setAttribute("class", "result");
    div.setAttribute("class", "hide");
    
    section.appendChild(pQuestion);
    section.appendChild(inputText);
    section.appendChild(inputBtn);
    section.appendChild(pResponse);
    
    div.appendChild(table);
    
    header.appendChild(h1);
    
    main.appendChild(header);
    main.appendChild(section);
    main.appendChild(div);
    
    obj.content.appendChild(main);
    
    pQuestion.innerHTML = "Question";
}

/*
<main>
    <header><h1>THE QUIZ</h1></header>
    <section>
        <p id="question">Question</p>
        <input type="text" name="answer" id="answer" placeholder="Answer" />
        <input type="submit" value="SEND" name="submit" id="submit" />
        <p id="response"></p>
    </section>
    <div id="result" class="hide">
        <table>
            
        </table>
    </div>
</main>
*/