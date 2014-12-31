"use strict";

function Window(icon, desk, title){
    
    console.log("Window");
    //document.getElementsByClassName('window')[1].style.backgroundColor = '#84C174';

    var template = document.querySelector("#template");
    var windowTemplate = template.content.querySelector(".window");
    this.w = windowTemplate.cloneNode(true);
    
    this.w.querySelector(".appTitle").innerHTML = title; // lägger dit titlen
    this.w.querySelector(".appIcon").src = icon; // läggaer dit bilden
    
    desk.content.appendChild(this.w);
    
    this.content = this.w.querySelector(".content"); // där själva appen laddas
    
    this.appStatus = this.w.querySelector(".status"); // använder för att ta bort giff och laddnings text
    this.appload = this.w.querySelector(".loadingImg"); // placera laddnings gif här
    this.apploadText = this.w.querySelector(".loadingText"); // laddnings text
    this.desktopBack = document.querySelector("#desktop"); // byta bakgrunds bild
    
    
    var close = this.w.querySelector(".appClose");
    var that = this;
    close.addEventListener("click", function(){
        that.close();
    });
    
    
      /*// flyt bara fönster  (fungerar men inte om man har resize på :/ (flytta till prototype?))
        this.w.onmousedown = function(){
            var self = this
            document.onmousemove = function(e) {
                e = e || event
                self.style.left = e.pageX-25+'px'
                self.style.top = e.pageY-25+'px'
            }
            this.onmouseup = function() {
                document.onmousemove = null
            }
        };
        this.w.ondragstart = function() { return false }
        */
        
        // new movement code... 
        this.moveme = this.w.querySelector(".content");
        
        var selected = null, xPos = 0, yPos = 0, xElem = 0, yElem = 0;
        
        function dragInit(elem){
            selected = elem;
            xElem = xPos - selected.offsetLeft;
            yElem = yPos - selected.offsetTop;
        }
        
        function moveElem(e){
            xPos = document.all ? window.event.clientX : e.pageX;
            yPos = document.all ? window.event.clientY : e.pageY;
            if(selected !== null){
                selected.style.left = (xPos - xElem) + 'px';
                selected.style.top = (yPos - yElem) + 'px';
            }
        }
        function destroyMove(){
            selected = null;
        }
        this.w.addEventListener("mousedown", function(){
            dragInit(this);
            return false;
        });
        document.onmousemove = moveElem;
        document.onmouseup = destroyMove;
        
    // rezisa fönstret (flytta till prototype?)
    var startX, startY, startWidth, startHeight;
    var resize = this.w.querySelector(".rezise");
    resize.addEventListener("mousedown", init, false);
    
    function init(e){
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(that.w).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(that.w).height, 10);
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false); 
    }
    
    function doDrag(e) {
        that.w.style.width = (startWidth + e.clientX - startX) + 'px';
        that.w.style.height = (startHeight + e.clientY - startY) + 'px';
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false); 
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    //var doc = document.getElementsByClassName('window');
    //doc[1].style.marginLeft = "20px";
    //doc[1].style.marginTop = "20px";
    
    
}

Window.prototype.close = function(){
    this.w.parentNode.removeChild(this.w);  
};
