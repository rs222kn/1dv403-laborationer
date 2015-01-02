"use strict";
    
function Window(icon, desk, title, url, h, w){
    // stoelekn på fönsterna
    h = h || "300";
    w = w || "260";
    
    this.url = url;
    
    console.log("Window");
    //document.getElementsByClassName('window')[1].style.backgroundColor = '#84C174';
    
    var template = document.querySelector("#template");
    var windowTemplate = template.content.querySelector(".window");
    this.w = windowTemplate.cloneNode(true);
    
    this.w.querySelector(".appTitle").innerHTML = title; // lägger dit titlen
    this.w.querySelector(".appIcon").src = icon; // läggaer dit bilden
    
    desk.content.appendChild(this.w);
    this.content = this.w.querySelector(".content"); // där själva appen laddas

    // vart fönstret ska vara
    this.windowPos(12, 5);
    
    // storlek på fönstret.
    this.w.style.height = h+'px';
    this.w.style.width = w+'px';
    
    var that = this;
    
    this.w.querySelector(".appClose").addEventListener("click", function(){
        that.close();
    });

    // VARFÖR FUNGERAR INTE DETTA?!
    /*function getPosition(event)
	{
        var x = event.x;
        var y = event.y;
        
        x -= that.w.querySelector(".content").offsetLeft;
        y -= that.w.querySelector(".content").offsetTop;
        
        var aX = event.pageX - that.content.offsetLeft; 
        var aY = event.pageY - that.content.offsetTop;
        
        console.log("nr 1 : x:" + x + " y:" + y);
        console.log("nr 2 : x:" + aX + " y:" + aY);
        console.log("====================");
	}*/

   // flyt bara fönster (flytta till prototype?)
    this.w.onmouseover = function(){
        var self = this;
        that.w.querySelector(".one").onmousedown = function(ev){
            var pos = that.getPosition(ev);// sjukt mycket dålig kod för att få en postition i ett fönster (den kortare versionen fungerar inte med this/that :'( )
            
            document.onmousemove = function(e) {
                e = e || event;
                self.style.left = e.pageX-pos[0] + 'px';
                pos[1] = 10; // sätt till 10 då det blev knas med den automatiska räknaren :S 
                self.style.top = e.pageY-pos[1] + 'px';
            };
            self.addEventListener("mouseup", function(){
                document.onmousemove = null;
                //that.windowPos(1);
            });
        };
    };
    
    
    this.windowFocus(1);
    this.w.addEventListener("mousedown", function() {
        that.windowFocus(1);
    });
    
    // rezisa fönstret (flytta till prototype?)
    var startX, startY, startWidth, startHeight;
    var resize = this.w.querySelector(".rezise");
    resize.addEventListener("mousedown", initMove, false);
    function initMove(e){
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(that.w).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(that.w).height, 10);
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false); 
    }
    // starta stopa drag
    function doDrag(e) {
        that.w.style.width = (startWidth + e.clientX - startX) + 'px';
        that.w.style.height = (startHeight + e.clientY - startY) + 'px';
    }
    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false); 
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
}

// stänger ned fönstret
Window.prototype.close = function(){
    this.w.parentNode.removeChild(this.w);  
}; 

// hämtar position inne i en div
Window.prototype.FindPosition = function(oElement){
    
    if(typeof( oElement.offsetParent ) != "undefined")
      {
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
        {
          posX += oElement.offsetLeft;
          posY += oElement.offsetTop;
        }
          return [ posX, posY ];
        }
        else
        {
          return [ oElement.x, oElement.y ];
    }
}; 
Window.prototype.getPosition = function(e) {
    var PosX = 0;
    var PosY = 0;
    var statusPos;
    statusPos = new this.FindPosition(this.content);
    
    if (e.pageX || e.pageY){
        PosX = e.pageX;
        PosY = e.pageY;
    }else if (e.clientX || e.clientY){
        PosX = e.clientX + document.body.scrollLeft+ document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop+ document.documentElement.scrollTop;
    }
    var pos = [];
    pos[0] = PosX - statusPos[0];
    pos[1] = PosY - statusPos[1];
    pos[1] = Math.abs(pos[1]);
    return pos;
};

// bestämmer vilket fönster som ska vara högst uup!
Window.prototype.windowFocus = function(z){
    console.log("windowFocus prototype");
    
    z += Window.ZIndex;
    this.w.style.zIndex = z;
    Window.ZIndex = z;
    
};
Window.ZIndex = 0;

// flyttar fönstret lite varge gång man öppnar nytt
Window.prototype.windowPos = function(top, left){
    console.log("windowPos prototype");
    
    top += Window.windowTop;
    left += Window.windowLeft;
    
    this.w.style.top = top+'px';
    this.w.style.left = left+'px';
    
    Window.windowTop = top;
    Window.windowLeft = left;
    
};
Window.windowTop = 0;
Window.windowLeft = 0;