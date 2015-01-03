"use strict";

function Rss(obj){
    
    var that = this;
    this.getRssFeed(obj);
    
    this.intevall = setInterval(function () {
        that.getRssFeed(obj); 
    }, 30000);
    

    obj.w.querySelector(".appClose").addEventListener("click", function(){
        clearInterval(that.intevall);
    });
}

Rss.prototype.getRssFeed = function(obj) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                
                obj.content.innerHTML ="";
                var parser = new DOMParser();
                var feed = parser.parseFromString(xhr.responseText, "text/html");

                console.log(feed.firstChild);
                obj.content.appendChild(feed.firstChild);
            }
        }    
    };
    
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt"));
    xhr.send(null);
};