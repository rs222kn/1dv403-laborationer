"use strict";

function Rss(obj){
    
    this.intevall = undefined;
    this.getRssFeed(obj);
    this.update(obj);
    
    var that = this;
    obj.w.querySelector(".appClose").addEventListener("click", function(){
        clearInterval(that.intevall);
    });
}

Rss.prototype.update = function(obj) {
    var that = this;
    this.intevall = setInterval(function () {
        that.getRssFeed(obj); 
    }, 60000);
    
};

Rss.prototype.getRssFeed = function(obj) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                
                obj.loadImg.setAttribute("src", ""); // laddar animation
                obj.loadText.innerHTML = "klar"; // laddar text
                obj.content.innerHTML =""; // tömmer gammalt content
                
                var parser = new DOMParser();
                var feed = parser.parseFromString(xhr.responseText, "text/html");

                obj.content.appendChild(feed.firstChild);
            }
        } 
    };
    obj.loadImg.setAttribute("src", "pic/ajaxloader.gif"); // laddar animation
    obj.loadText.innerHTML = "Laddar"; // laddar text
    
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt"));
    xhr.send(null);
};