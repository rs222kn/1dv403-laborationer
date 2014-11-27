"use strict";

var makePerson = function(persArr){

    for (var i = 0; i < persArr.length; i++) {
        
        // checkar om man motaget data är i rätt form
        if(typeof(persArr[i].name) !== 'string'){
            console.log("InteString");
        }else{
            //console.log("ärString");
        }
        if(typeof(persArr[i].age) !== 'number'){
            //persArr[i].age = 0;
            console.log("feeel");
        }else{
            //console.log("ärNr");
        }
    }

    // skapar ett objekt som inehåller x antal funktioner med uträkningar 
   var obj = { 
        minAge: function(){// return Math.min.apply( Math, array );

            return Math.min.apply(Math,persArr.map(function(persArr){return persArr.age}));
        },
        maxAge: function(){
            return Math.max.apply(Math,persArr.map(function(persArr){return persArr.age}));
        },
        averageAge: function(){
            return Math.round(persArr.map(function(persArr){return persArr.age}).reduce(function(a,b){return a+b })/ persArr.length);
        },
        names: function() {
            return persArr.map(function(persArr){return persArr.name}).sort(function(a,b){return a.localeCompare(b)}).join(", ").toString();
        }
   };
    return {minAge: obj.minAge(),maxAge: obj.maxAge(),averageAge: obj.averageAge(), names: obj.names()};
}

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
var result = makePerson(data);
console.log(result);

