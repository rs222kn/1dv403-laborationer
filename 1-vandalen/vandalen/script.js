"use strict";

var makePerson = function(persArr){


	// Din kod här...
	//console.log(persArr); 
    /*
    var nameArray = [];
    var nameString = "";
                                                    ALLT = FEEEEL
   var minValueArr = [];
   var ValueArr = [];
   
   var sum = 0;
   
   function loop(){
       for (var i = 0; i < persArr.length; i++) {
            ValueArr[i] = persArr[i].age;
            sum += ValueArr[i]; 
        }
   }
   console.log("hej " + loop());
   
   var obj = {
        minAge: function(){
             
            return ValueArr.min();
        },
        maxAge: function(){
            
            return ValueArr.max();
        },
        averageAge: function(){
            return sum/ValueArr.length;
        },
        names: function(){
            //persArr.sort();
            for (var i = 0; i < persArr.length; i++) {
                
                nameArray[i] = persArr[i].name;
            }
            nameArray.sort();
            nameString  = nameArray.join(", ");
            console.log(g);
            return nameString;
           
        } 
   };
    //console.log(obj.names());
    return obj;
    */
}

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
var result = makePerson(data);
console.log(result);

