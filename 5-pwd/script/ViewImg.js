"use strict";

var pwd = pwd || {};
pwd.ViewImg = function (obj) {
    
    this.obj = obj;
    var that = this;
    this.menuItems = (function () {
        
        var elem = that.obj.menuElement.querySelectorAll("div");
        var items = [].map.call(elem, function(objs) {
            return objs.querySelectorAll("li");
        });
        
        return function (item, nr) {
            return items[item][nr];
        };
    }());
    
    this.menuItems(0, 0).addEventListener("click", function () {
        obj.desktop.content.style.backgroundImage = 'url('+obj.icon+')'; 
    });
    

    obj.content.style.backgroundImage = 'url('+obj.icon+')';
    
};