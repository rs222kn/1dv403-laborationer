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
                }
                
                var cells = (i * cellX) + j; // antalet celler i gridd
                
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
        
        function press(e, it, ranImg){
            Memory.timers(0, it, ranImg);
            Memory.imgTagIndex[it].img.setAttribute("src", 'pics/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
            
        }
    },
    timers: function(timerId, it){
        var timeoutID;
        
        var time = {
            changeBackPic: function(){
                timeoutID = window.setTimeout(function(){
                    Memory.imgTagIndex[it].img.setAttribute("src", 'pics/0.png');
                }, 1000);
            }
        }
        
        switch(timerId){
            case 0:
                time.changeBackPic();
            case 1:
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