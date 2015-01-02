"use strict";

function Rss(){
    console.log("Rss");
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
          
            }
        }    
    };
    
    xhr.open();
    xhr.send();
}