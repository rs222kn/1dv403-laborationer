"use strict";

pwd.ImgViewer =function (obj){
    this.getImg(obj);
};

// laddar hämtar url's från server
pwd.ImgViewer.prototype.getImg = function(obj) {
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
    
    obj.loadImg.setAttribute("src", "pic/ajaxloader.gif"); // laddar animation
    obj.loadText.innerHTML = "Laddar"; // laddar text
    
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    xhr.send(null);
};

// (laddar bilderna från en server och man kan sätta dom som bakgrunds bild om man vill) old
// skapar element som ett grid dom fylls sedan med bilder.
pwd.ImgViewer.prototype.presentImg = function (picArray, obj) {
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
        
        this.ViewImg(div, picArray[i].URL, picArray[i].width, picArray[i].height, obj);
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

// sätter bakgrunden på skrivbordet // öppnar bilden man klickar på i nytt fönster // lägger den som en icon
pwd.ImgViewer.prototype.ViewImg = function(div, url, w, h, obj) {
    // öppnar bilden i ett nytt fönster
    div.addEventListener("click", function(){
        new pwd.ViewImg(new pwd.Window(url, obj.desktop, "Foto", null, h, w));
    });
    
    // addar en desktop ikon till bilden på right klick
    div.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        obj.desktop.loadApp(url, pwd.ViewImg, "Foto", h, w);
    });
};
