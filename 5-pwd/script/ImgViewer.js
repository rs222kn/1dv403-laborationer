"use strict";

function ImgViewer(obj){
    
    console.log("ImgViewer");

    var xhr =  new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                obj.appStatus.innerHTML = "Klar";
                loadImg(JSON.parse(xhr.responseText));
            }
        }
    }
    
    obj.appload.setAttribute("src", "pic/ajaxloader.gif"); // laddar animation
    obj.apploadText.innerHTML = "Laddar"; // laddar text
    
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    xhr.send(null);
    
    // laddar bilderna från en server och man kan sätta dom som bakgrunds bild om man vill
    function loadImg(picArray){
        var ValueH = 0;
        var ValueW = 0;
        
        for (var i = 0; i < picArray.length; i++) {
            
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
            
            setBackground(div, picArray[i].URL, picArray[i].width, picArray[i].height);
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
        
        // sätter bakgrunden på skrivbordet
        function setBackground(div, url, w, h){
            div.addEventListener("click", function(){
                  console.log(obj.desktopBack);
                  obj.desktopBack.style.backgroundImage = 'url('+url+')';
            });
        }
    }
    
}

