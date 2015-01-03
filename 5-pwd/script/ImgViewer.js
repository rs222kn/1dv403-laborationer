"use strict";

function ImgViewer(obj){
    this.getImg(obj);
}

// laddar hämtar url's från server
ImgViewer.prototype.getImg = function(obj) {
    var that = this;
    var xhr =  new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                obj.w.querySelector(".status").innerHTML = "Klar";
                that.presentImg(JSON.parse(xhr.responseText), obj);
            }
        }
    };
    
    
    obj.w.querySelector(".loadingImg").setAttribute("src", "pic/ajaxloader.gif"); // laddar animation
    obj.w.querySelector(".loadingText").innerHTML = "Laddar"; // laddar text
    
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    xhr.send(null);
};

// laddar bilderna från en server och man kan sätta dom som bakgrunds bild om man vill
ImgViewer.prototype.presentImg = function (picArray, obj) {
    var ValueH = 0;
    var ValueW = 0;
    
    for (var i = 0; i < picArray.length; i++) {
        
        // får inte lägga denna utanför loopen :S
        for (var j = 0; j < picArray.length; j++) {
            compare(picArray[j].thumbHeight, picArray[i].thumbWidth);
        }
        
        var div = document.createElement("div");
        var a = document.createElement("a");
        var img = document.createElement("img");
        
        img.setAttribute("src", picArray[i].thumbURL);
        img.setAttribute("height", picArray[i].thumbHeight);
        img.setAttribute("width", picArray[i].thumbWidth);
        
        a.setAttribute("href", "#");
        
        div.setAttribute("class", "imgWrap");
        //div.setAttribute("height", ValueH);
        //div.setAttribute("width", ValueW);
        div.style.height = ValueH+'px';
        div.style.width = ValueW+'px';
        
        a.appendChild(img);
        div.appendChild(a);
        
        obj.content.appendChild(div);
        
        this.ViewImg(div, picArray[i].URL, picArray[i].width, picArray[i].height);
    }
    
    // Tar fram högsta thumbHeight och högsta thumbWidth,
    function compare (h, w){
        if(h > ValueH){
            ValueH = h;  
        }
        if(w > ValueW){
            ValueW = w;
        }
    }

};

// sätter bakgrunden på skrivbordet // öppnar bilden man klickar på i nytt fönster
ImgViewer.prototype.ViewImg = function(div, url, w, h) {
    div.addEventListener("click", function(){
        new Desktop().loadImg(div, url, h, w, "pic/icon1.png", ViewImg, "Foto"); 
    });
};
