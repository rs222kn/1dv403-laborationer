"use strict";
    
var pwd = pwd || {};
pwd.Window = function (icon, desk, title, prop, h, w){
    // standard stoelekn på fönsterna
    h = h || "300";
    w = w || "260";
    
    this.prop = prop; // typ av fönster
    this.icon = icon; 
    this.desktop = desk;
    
    this.height = h; // storlek
    this.width = w;
    // positionen på fönstret
    this.posX = 0;
    this.posY = 0;
    var that = this;
    
    //document.getElementsByClassName('window')[1].style.backgroundColor = '#84C174';
    var template = document.querySelector("#template");
    var windowTemplate;
    
    // fix för ie 11
    if(document.documentMode){ // upptäcker om man kör ie
         windowTemplate = template.querySelector(".window"); // ie har inte fult stöd för .content
    }else{
         windowTemplate = template.content.querySelector(".window");
    }
    
    this.w = windowTemplate.cloneNode(true);
    this.w.querySelector(".appTitle").innerHTML = title; // lägger dit titlen
    this.w.querySelector(".appIcon").src = icon; // läggaer dit bilden
    
    
    // sparar för snab och enkel åtkomst
    this.content = this.w.querySelector(".content"); // där själva appen laddas
    this.loadText = this.w.querySelector(".loadingText");
    this.loadImg = this.w.querySelector(".loadingImg");
    this.menuElement = this.w.querySelector(".menu");
    
/* egenskaper på fönstret */
    // om appen ska använda meny.
    if(this.prop.menu === true){
        that.makeMenu();
        that.menuHover();
    }else{
        that.hideElement(that.menuElement);
    }
    
    // om appen ska kunna ändra storlek.
    if(this.prop.resize === true){
        this.resizeit();
    }
    
    this.windowPos(22, 10, (window.innerHeight - 70), (window.innerWidth - this.width), true); // placering av fönsteret
    this.move(); // flytta fönstret
    
    // storlek på fönstret.
    this.w.style.height = this.height+'px';
    this.w.style.width = this.width+'px';
    
    /* event */
    this.w.querySelector(".appClose").addEventListener("click", function(){
        that.close(); //  stänga fönstret
    });
    
    this.w.querySelector(".appFullScreen").addEventListener("click", function(){
        that.fullScreen(); //  stora små fönster
    });
    
    this.windowFocus(1); // focus på fönstret
    this.w.addEventListener("mousedown", function() {
        that.windowFocus(1);
    });
    
    desk.content.appendChild(this.w); // lägger ut ett "Window" på html sidan
};



// skapar menyn
pwd.Window.prototype.makeMenu = function(){
    var template = document.querySelector("#template");
    var menuTemplate;
    var that = this;
    // fix för ie 11
    if(document.documentMode){ // upptäcker om man kör ie
         menuTemplate = template.querySelector(".menus"); // ie har inte fult stöd för .content
    }else{
         menuTemplate = template.content.querySelector(".menus");
    }     
    
    for (var i = 0; i < this.prop.menuItems.length; i++) {
        
        that.menuClone = menuTemplate.cloneNode(true);
        that.menuElement.appendChild(that.menuClone);
        that.menuClone.querySelector(".menuTitle").innerHTML = that.prop.menuItems[i];
        
        for (var j = 0; j < this.prop.menuListText[i].length; j++) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            
            a.setAttribute("href", "#");
            a.innerHTML = that.prop.menuListText[i][j];
            
            li.appendChild(a);    
            
            that.menuClone.querySelector("ul").appendChild(li);
        }
    }
};

// lägger till hover event på menyn
pwd.Window.prototype.menuHover = function (){

    var that = this;
    for (var i = 0; i < this.menuElement.querySelectorAll("div").length; i++) {
    
            eventStuff(i);
    }
    function eventStuff(j){
        that.menuElement.querySelectorAll("div")[j].addEventListener("mouseover", function(){
            that.showElement(that.menuElement.querySelectorAll("div")[j].querySelector("ul"));
        });
        
        that.menuElement.querySelectorAll("div")[j].addEventListener("mouseout", function(){
            that.hideElement(that.menuElement.querySelectorAll("div")[j].querySelector("ul"));
        });
    }
};

pwd.Window.prototype.hideElement = function(list){
    list.setAttribute("class", "hide");    
};

pwd.Window.prototype.showElement = function (list) {
    list.removeAttribute("class", "hide");
};

// stänger ned fönstret.
pwd.Window.prototype.close = function(){
    this.w.parentNode.removeChild(this.w);  
}; 

// ändra storleken på fönstert.
pwd.Window.prototype.resizeit = function () {
    var that = this;
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
    
    this.w.querySelector(".rezise").style.backgroundImage = "url("+"pic/resize.png"+")";
    
};

// hämtar position inne i en div.
pwd.Window.prototype.FindPosition = function(oElement){
    
    if(typeof(oElement.offsetParent) != "undefined"){
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent){
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [ posX, posY ];
    }else{
        return [ oElement.x, oElement.y ];
    }
};

// hämtar positionen ur 
pwd.Window.prototype.getPosition = function(e) {
    var PosX = 0;
    var PosY = 0;
    var statusPos;
    statusPos = new this.FindPosition(this.content);
    
    if (e.pageX || e.pageY){
        PosX = e.pageX;
        PosY = e.pageY;
    }else if (e.clientX || e.clientY){
        PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    var pos = [];
    pos[0] = PosX - statusPos[0];
    pos[1] = PosY - statusPos[1];
    pos[1] = Math.abs(pos[1]);
    return pos;
};

// bestämmer vilket fönster som ska vara högst uup!
pwd.Window.prototype.windowFocus = function(z){
    z += pwd.Window.ZIndex;
    this.w.style.zIndex = z;
    document.querySelector("#menu").style.zIndex = z+1;
    pwd.Window.ZIndex = z;
    
};
pwd.Window.ZIndex = 0;

// flyttar fönstret lite varge gång man öppnar nytt.
pwd.Window.prototype.windowPos = function(top, left, height, width, save){
    //save = save || true;
    
    if((pwd.Window.windowTop+top) > height){
        pwd.Window.windowTop = 0;
        pwd.Window.windowLeft*2 ;
        
    }
    
    if((pwd.Window.windowLeft+left) > width-70){
        pwd.Window.windowLeft = pwd.Window.windowLeft/2;
        pwd.Window.windowTop = 0;
    }
    top += pwd.Window.windowTop;
    left += pwd.Window.windowLeft;
    
    this.w.style.top = top+'px';
    this.w.style.left = left+'px';
    
    // sparar bara värderna om man vill
    if(save){
        pwd.Window.windowTop = top;
        pwd.Window.windowLeft = left;
    }
    
};
pwd.Window.windowTop = 0;
pwd.Window.windowLeft = 0;

// flytta fönstret (ej bästa sättet)
pwd.Window.prototype.move = function () {
    var that = this;
    this.w.onmouseover = function(){
        var self = this;
        that.w.querySelector(".one").onmousedown = function(ev){
            var pos = that.getPosition(ev);// sjukt mycket dålig kod för att få en postition i ett fönster (den kortare versionen fungerar inte med this/that :'( )
            
            document.onmousemove = function(e) {
                e = e || event;
                self.style.left = e.pageX-pos[0] + 'px';
                pos[1] = 10; // sätt till 10 då det blev knas med den automatiska räknaren :S 
                self.style.top = e.pageY-pos[1] + 'px';
                that.posX = self.style.left;
                that.posY = self.style.top;
                
            };
            self.addEventListener("mouseup", function(){
                document.onmousemove = null;
            });
        };
    };
};

// gör 'apparna' till fullScreen inom desktop.
pwd.Window.prototype.fullScreen = function() {
    
    if(this.w.style.width == window.innerWidth+'px'){
        this.windowPos(parseInt(this.posY, 10), parseInt(this.posX, 10), (window.innerHeight - 70), (window.innerWidth - this.width), false); // placering av fönsteret
        this.w.style.height = this.height+'px';
        this.w.style.width = this.width+'px';
    }else{
        this.w.style.top = 0+'px';
        this.w.style.left = 0+'px';
        this.w.style.height = (window.innerHeight-95)+'px';
        this.w.style.width = window.innerWidth+'px';    
    }
};