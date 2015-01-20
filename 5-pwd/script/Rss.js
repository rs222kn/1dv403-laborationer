"use strict";

var pwd = pwd || {};
pwd.Rss = function (obj){
    
    this.url = this.url || "http://www.dn.se/m/rss/senaste-nytt";
    this.uppdateTime = this.uppdateTime || 60000;
    
    this.intevall = undefined;
    this.obj = obj;
    this.date = new Date();
    
    this.getRssFeed(obj);
    this.update();
    
    var that = this;
    
    this.menuItems = (function () {
        console.log("körs");
        var elem = that.obj.menuElement.querySelectorAll("div");
        var items = [].map.call(elem, function(objs) {
            return objs.querySelectorAll("li");
        });
        
        return function (item, nr) {
            return items[item][nr];
        };
    }());
    
    this.menuItems(1, 0).addEventListener("click", function () {
        that.promt();
        that.addUppdateIntervallElements();
        
    });
    
    this.menuItems(1, 1).addEventListener("click", function() {
        that.promt();
        that.addSoursElement();
    });
    
    this.menuItems(1, 2).addEventListener("click", function() {
        that.getRssFeed();
    });
    
    obj.w.querySelector(".appClose").addEventListener("click", function(){
        clearInterval(that.intevall);
    });
};

// addar och tar bort promt rutan
pwd.Rss.prototype.promt = function(){
    var that = this;
    this.obj.w.querySelector(".hidePromt").removeAttribute("class", "hidePromt");
    var promte = this.obj.w.querySelector(".promt");
    
    var btnClose = document.createElement("input");
    btnClose.setAttribute("type", "submit");
    btnClose.setAttribute("value", "Stäng");
    btnClose.setAttribute("name", "submit");
    btnClose.setAttribute("class", "promtClose");
    this.obj.w.querySelector(".promt").appendChild(btnClose);

    // tar bort den
    this.obj.w.querySelector(".promtClose").addEventListener("click", function() {
        this.parentNode.parentNode.setAttribute("class", "hidePromt"); 
        promte.removeChild(btnClose);
        promte.removeChild(that.select);
        promte.removeChild(that.btn);
    });
    
};

// uppdateintervall promt element
pwd.Rss.prototype.addUppdateIntervallElements = function(){
    var that = this;
    this.select = document.createElement("select");
    this.btn = document.createElement("input");
    this.btn.setAttribute("type", "submit");
    this.btn.setAttribute("value", "uppdatera");
    this.btn.setAttribute("name", "submit");
    this.btn.setAttribute("class", "intervallUppdate");
    
    this.obj.w.querySelector(".promt").appendChild(this.select);
    this.obj.w.querySelector(".promt").appendChild(this.btn);
    
    
    for (var i = 0; i < 4; i++) {
        var option = document.createElement("option");
        option.innerHTML = i+1 +"min";
        option.setAttribute("value", i+1);
        this.select.appendChild(option);    
        
    }
    
    this.obj.w.querySelector(".intervallUppdate").addEventListener("click", function (argument) {
    
        clearInterval(that.intevall);
        var time = Number(that.obj.w.querySelector(".promt select").value);
        switch (time) {
            case 1:
                that.update(60000, 60000); 
                break;
            
            case 2:
                that.update((60000*2), (60000*2)); 
                break;
                
            case 3:
                that.update((60000*3), (60000*3)); 
                break;
            
            case 4:
                that.update((60000*4), (60000*4)); 
                break;
        }
        
    });
    
};

// ny källa promt element
pwd.Rss.prototype.addSoursElement = function () {
    var that = this;
    this.select = document.createElement("input");
    this.select.setAttribute("type", "text");
    this.select.setAttribute("name", "text");
    this.select.setAttribute("class", "newSours");
    
    this.btn = document.createElement("input");
    this.btn.setAttribute("type", "submit");
    this.btn.setAttribute("value", "Uppdatera");
    this.btn.setAttribute("name", "submit");
    this.btn.setAttribute("class", "uppdateSours");
    
    this.obj.w.querySelector(".promt").appendChild(this.select);
    this.obj.w.querySelector(".promt").appendChild(this.btn);
    
    this.obj.w.querySelector(".uppdateSours").addEventListener("click", function (argument) {
        
        clearInterval(that.intevall);
        that.url = that.obj.w.querySelector(".newSours").value;
        console.log(that.url);
        that.getRssFeed();
        
        
    });
    
};

// updaterar rss på en intervall
pwd.Rss.prototype.update = function(timeToUpdate, defaultTimeToUpdate) {
    
    defaultTimeToUpdate = defaultTimeToUpdate || 60000;
    timeToUpdate = timeToUpdate || defaultTimeToUpdate;
    
    var that = this;
    this.intevall = setInterval(function () {
        that.getRssFeed(); 
        
    }, timeToUpdate);
    
};

// hämtar rss feed
pwd.Rss.prototype.getRssFeed = function() {
    var that =this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                that.date = new Date();
                that.obj.loadImg.setAttribute("src", ""); // laddar animation
                that.obj.loadText.innerHTML = "senast uppdaterad " + that.date.getHours() + ":" + that.date.getMinutes(); // laddar text
                that.obj.content.innerHTML =""; // tömmer gammalt content
                
                //var parser = new DOMParser(); // gör texten till html kod.
                //var feed = parser.parseFromString(xhr.responseText, "text/html");
                
                that.obj.content.appendChild(xhr.responseXML.firstChild);
            }
        } 
    };
    this.obj.loadImg.setAttribute("src", "pic/ajaxloader.gif"); // laddar animation
    this.obj.loadText.innerHTML = "Laddar"; // laddar text
    
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape(this.url), true);
    xhr.responseType = "document";
    xhr.send(null);
};