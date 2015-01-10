"use strict";

function Memory(obj) {
    var template = document.querySelector("#template");
    // ie comp
    var windowTemplate;
    var tmp = document.documentMode;
    if(tmp){
         windowTemplate = template.querySelector(".memory");
    }else{
         windowTemplate = template.content.querySelector(".memory");
    }
    
    this.mem = windowTemplate.cloneNode(true);
    
    obj.content.appendChild(this.mem); // lägger ut memory på 
    
    var that = this;
    
    var Memory = {
    
    doc: {
        grid:   this.mem.querySelector(".mGrid"),
        pScore: this.mem.querySelector(".mScore"),
        pTime: this.mem.querySelector(".mTime"),
        pResult: this.mem.querySelector(".mResult")
    },
    
    vars: {
             // [5,5,3,3,4,4,2,2,7,7,6,6,1,1,8,8] Fusk! :P           
        ranImg: [], // alla random nr
        imgTagIndex: [], // lagrar hela create
        score: 0, 
        startTime: undefined,
        
        gridRows: 4, // storleken på le grid..
        gridCells: 4,
        
        itChe1: {id: null, imgNr: null, preJ: null}, // objekt som lagrar värdena på det gammla cell'trycket en för vardera cell 
        timesPressed: 0,
        timeoutID: null // timeout id för timer om man skulle vilja avbryta den.
    },
    // återställer alla värden.. 
    reset:function(){
        //Memory.vars.ranImg = [];
        Memory.vars.imgTagIndex = [];
        Memory.vars.score = 0;
        Memory.vars.startTime = undefined;
        
        Memory.vars.itChe1.id = null;
        Memory.vars.itChe1.imgNr = null;
        Memory.vars.itChe1.preJ = null;
        
        Memory.vars.timesPressed = 0;
        Memory.vars.timeoutID = null;
    },
    // inisierar alla variabler och obj o functioner
    init: function(){
        
        Memory.reset();
        Memory.vars.startTime = new Date();
        Memory.vars.ranImg.push(new RandomGenerator.getPictureArray(Memory.vars.gridRows, Memory.vars.gridCells)); 
        
        Memory.gameBord(Memory.vars.gridRows, Memory.vars.gridCells, Memory.vars.ranImg); //storleken på gridd
        
        //Memory.cellPress(Memory.vars.gridSelector.push(document.querySelectorAll(".gridCell")));
        
        // den riktiga
        Memory.cellPress(that.mem.querySelectorAll(".gridCell"));
    },
    // ritar upp game bord och skapar massa tagga
    gameBord: function(rowY, cellX){
        
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
                create.img.setAttribute("src", "pic/0.png");
                create.cell.setAttribute("class", "gridCell"); 
                
                // append's
                row.appendChild(create.cell); 
                create.cell.appendChild(create.a);
                create.a.appendChild(create.img);
                
                Memory.vars.imgTagIndex.push(create);
            } 
            Memory.doc.grid.appendChild(row); 
        }
    },
    // kärs om man trycker på en cell.
    cellPress: function(gridSelector){
        
        for (var i = 0; i < gridSelector.length; i++) {
            addListener(i);
        }
        
        function addListener(j) {
            gridSelector[j].addEventListener("click",function func(e){
                press(e, j, Memory.vars.ranImg[0][j], func);
           });
        }
        function removeListener(id, func){
            gridSelector[id].removeEventListener("click", func);
        }
        
        // Truck på en av alla cell'er
        function press(e, it, ranImg, func){
            if(Memory.vars.timesPressed === 0){ // cell tryck 1
                Memory.vars.imgTagIndex[it].img.setAttribute("src", 'pic/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
                
                Memory.vars.itChe1.id = it; // sparar nuvarande värden så dom kan användas senare
                Memory.vars.itChe1.imgNr = ranImg;
                Memory.vars.timesPressed=1;
                
                removeListener(it,func);
                
            }else if(Memory.vars.timesPressed === 1){ // cell tryck 2
                Memory.vars.imgTagIndex[it].img.setAttribute("src", 'pic/'+ranImg+'.png'); // byter bild när man klickar på den specifik cell
                
                removeListener(it,func);
                
                // kollar om dom båda har samma imgNr (altså dom har samma bild)
                if(Memory.vars.itChe1.imgNr === ranImg){
                    Memory.vars.score++;
                    Memory.doc.pScore.innerHTML = "Score: "+ Memory.vars.score;
                    var total = Memory.vars.gridRows + Memory.vars.gridCells;
                    
                    // fixar allt med poäng.
                    if(Memory.vars.score === total){
                        Memory.doc.pResult.innerHTML = "Grattis du klarade det!";
                        var endDate = new Date();
                        var totTime =  (endDate - Memory.vars.startTime)/1000; 
                        Memory.doc.pTime.innerHTML = "Det tog dig: " + totTime + "sekunder";
                    }
                }else{ // om inte kallar vi på timer som tar bort bilderna.
                    //Memory.timers(0 , Memory.vars.itChe1.id, it);
                    
                    setTimeout(function(){
                        Memory.vars.imgTagIndex[it].img.setAttribute("src", 'pic/0.png'); 
                        Memory.vars.imgTagIndex[Memory.vars.itChe1.id].img.setAttribute("src", 'pic/0.png');
                    
                        addListener(it);
                        addListener(Memory.vars.itChe1.id);
                    }, 1000);
                }
                Memory.vars.timesPressed = 2; // gör så man inte kan klicka felra gånger.
                // återställer klick functionen efter 1sec. 
                setTimeout(function() {
                    Memory.vars.timesPressed = 0;
                    Memory.vars.itChe1.id = null;
                    Memory.vars.itChe1.imgNr = null;
                }, 1000);
            }
        }
    },
    // tar han om alla olika timers o timer reset
};

Memory.init();
    
}



