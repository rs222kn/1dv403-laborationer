"use strict";

var Memory = {
    
    doc: {
        grid:   document.getElementById("grid"),
        pScore: document.getElementById("score"),
        pTime: document.getElementById("time"),
        pResult: document.getElementById("result")
    },
             // [5,5,3,3,4,4,2,2,7,7,6,6,1,1,8,8] Fusk! :P           
    ranImg: [[5,5,3,3,4,4,2,2,7,7,6,6,1,1,8,8]], // alla random nr
    imgTagIndex: [], // lagrar hela create
    score: 0, 
    startTime: undefined,
    
    gridRows: 4,
    gridCells: 4,
    init: function(){
        Memory.startTime = new Date();
        //Memory.ranImg.push(new RandomGenerator.getPictureArray(Memory.gridRows, Memory.gridCells)); 
        
        console.log("SlupmArr: " + Memory.ranImg);
        Memory.gameBord(Memory.gridRows, Memory.gridCells, Memory.ranImg); //storleken på gridd
        
    },
    gameBord: function(rowY, cellX, imgNr){
        
        for(var i = 0; i < rowY; i++){ 
        
            var row = document.createElement("tr"); 
            row.setAttribute("class","gridRow");
            
            for(var j = 0; j < cellX; j++){ 
                
                var create ={
                    cell: document.createElement("td"),
                    a: document.createElement("a"),
                    img: document.createElement("img")
                };
                
                //var cells = (i * cellX) + j; // antalet celler i gridd // kan användas för att räkna ut score
                
                // attributer
                create.a.setAttribute("href", "#");
                create.img.setAttribute("src", "pics/0.png");
                create.cell.setAttribute("class", "gridCell"); 
                
                // append's
                row.appendChild(create.cell); 
                create.cell.appendChild(create.a);
                create.a.appendChild(create.img);
                
                Memory.imgTagIndex.push(create);
            } 
            Memory.doc.grid.appendChild(row); 
        }
        console.log(Memory.imgTagIndex);
        Memory.cellPress(document.querySelectorAll(".gridCell"));

    },
    
    
    cellPress: function(gridSelector){
        
        for (var i = 0; i < gridSelector.length; i++) {
            call(i);
        }
        
        function call(j) {
            gridSelector[j].addEventListener("click",function(e){
               press(e, j, Memory.ranImg[0][j]);
           });
        }
        
        // Truck på en av alla cell'er
        function press(e, it, ranImg){
            console.log(Memory.timesPressed);
            if(Memory.timesPressed === 0){ // cell tryck 1
                Memory.imgTagIndex[it].img.setAttribute("src", 'pics/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
                
                Memory.itChe1.id = it; // sparar nuvarande värden så dom kan användas senare
                Memory.itChe1.imgNr = ranImg;
                
                Memory.timesPressed=1;
                
            }else if(Memory.timesPressed === 1){ // cell tryck 2
                Memory.imgTagIndex[it].img.setAttribute("src", 'pics/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
                
                Memory.itChe2.id = it; // sparar nuvarande värden så dom kan användas senare
                Memory.itChe2.imgNr = ranImg;
                
                // kollar om dom båda har samma imgNr (altså dom har samma bild)
                if(Memory.itChe1.imgNr === ranImg){
                    Memory.score++;
                    Memory.doc.pScore.innerHTML = "Score: "+ Memory.score;
                    var total = Memory.gridRows + Memory.gridCells;
                    
                    // fixar allt med poäng.
                    if(Memory.score === total){
                        Memory.doc.pResult.innerHTML = "Grattis du klarade det!";
                        var endDate = new Date();
                        var totTime =  (endDate - Memory.startTime)/1000; 
                        Memory.doc.pTime.innerHTML = "Det tog dig: " + totTime + "sekunder";
                        
                    }
                }else{ // om inte kallar vi på timer som tar bort bilderna.
                    Memory.timers(0 , Memory.itChe1.id, Memory.itChe2.id);
                }
                Memory.timesPressed=2; // gör så man inte kan klicka felra gånger.
                Memory.timers(2); // återställer klick functionen efter 1sec. 
            }else{
                console.log("else :(");
             }
        }
    },
    // reset function som återställer alla värden.
    reset:function(){
        Memory.timesPressed = 0;
        Memory.itChe1.id = null;
        Memory.itChe1.imgNr = null;
        Memory.itChe2.id = null;
        Memory.itChe2.imgNr = null;
        console.log(Memory.timesPressed);
    },
    itChe1: {id: null, imgNr: null}, // objekt som lagrar värdena på det gammla cell'trycket en för vardera cell 
    itChe2: {id: null, imgNr: null},
    timesPressed: 0,
    timeoutID: null, // timeout id för timer om man skulle vilja avbryta den.
    
    timers: function(timerId, it1, it2){
        
        var time = {
            changeBackPic: function(){
                Memory.timeoutID = setTimeout(function(){
                    // byter till standard bild efter 1sec
                    Memory.imgTagIndex[it1].img.setAttribute("src", 'pics/0.png'); 
                    Memory.imgTagIndex[it2].img.setAttribute("src", 'pics/0.png');
                }, 1000);
            },
            justWait: function(){
                setTimeout(function() {
                    Memory.reset();
                }, 1000);
            }
        };
        switch(timerId){
            case 0:
                time.changeBackPic();
                break;
            case 1:
                clearTimeout(Memory.timeoutID);
                break;
            case 2:
                time.justWait();
                break;
        }
    }
};

window.onload = Memory.init;