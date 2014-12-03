"use strict";

var Memory = {
    
    doc: {
        grid:   document.getElementById("grid")
        
    },
    
    ranImg: [], // alla random nr
    imgTagIndex: [], // lagrar hela create
     
    init: function(){
        
        Memory.ranImg.push(new RandomGenerator.getPictureArray(4, 4)); 
        
        console.log("SlupmArr: " + Memory.ranImg);
        Memory.gameBord(4, 4, Memory.ranImg); //storleken på gridd
        
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
                
               // var cells = (i * cellX) + j; // antalet celler i gridd
                
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
            
            if(Memory.timesPressed == 0){ // cell tryck 1
                Memory.imgTagIndex[it].img.setAttribute("src", 'pics/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
                
                Memory.itChe1.id = it; // sparar nuvarande värden så dom kan användas senare
                Memory.itChe1.imgNr = ranImg;
                
                Memory.timesPressed++;
            }else if(Memory.timesPressed == 1){ // cell tryck 2
                Memory.imgTagIndex[it].img.setAttribute("src", 'pics/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
                
                Memory.itChe2.id = it; // sparar nuvarande värden så dom kan användas senare
                Memory.itChe2.imgNr = ranImg;
                
                // kollar om dom båda har samma imgNr (altså dom har samma bild)
                if(Memory.itChe1.imgNr === Memory.itChe2.imgNr){
                    console.log("lika");
                }else{ // om inte kallar vi på timer som tar bort bilderna
                    console.log("inte lika");
                    Memory.timers(0 , Memory.itChe1.id, Memory.itChe2.id);
                    
                }
            
                // nollställer allt (Memory.itChe'X' behövs inte nollställas egntligen..)
                Memory.timesPressed = 0;
                Memory.itChe1.id = null;
                Memory.itChe1.imgNr = null;
                Memory.itChe2.id = null;
                Memory.itChe2.imgNr = null;
            }
        }
    },
    
    itChe1: {id: null, imgNr: null}, // objekt som lagrar värdena på det gammla cell'trycket en för vardera cell 
    itChe2: {id: null, imgNr: null},
    timesPressed: 0,
    
    timeoutID: null, // timeout id för timer om man skulle vilja avbryta den.
    
    timers: function(timerId, it1, it2){
        var time = {
            changeBackPic: function(){
                Memory.timeoutID = window.setTimeout(function(){
                    // byter till standard bild efter 1sec
                    Memory.imgTagIndex[it1].img.setAttribute("src", 'pics/0.png'); 
                    Memory.imgTagIndex[it2].img.setAttribute("src", 'pics/0.png');
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
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
        
    }
    
};

window.onload = Memory.init;