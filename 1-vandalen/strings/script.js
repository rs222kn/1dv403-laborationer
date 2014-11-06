"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		if(isNaN(str)){
			console.log("inte number");
		}else {
			console.log("number");
		}
			
		var charer;
	
		
		//var p = str.replace("a", "#");
		//console.log(p);
		var p = "";
		var lower = "";
		var upper = "";
		var total = "";
		for (var i = 0; i < str.length; i++) {
			
			//charer = str[i];
			
			p += str[i].replace(/\a|\A/g,"#");
			
			if(str[i] == str[i].toUpperCase() ){
				//p[i].toLowerCase();	
				//console.log(p[i] + "hej");
				total += p[i].toLowerCase();
				//total += lower;
				//p[i] = str[i].toLowerCase();
				
				//p = p[i].replace(p[i].toUpperCase(), p[i].toLowerCase()).replace(p[i].toLowerCase(), p[i].toUpperCase());
				//console.log(p);
				
				//str[i].replace();
				
			}else{
				//
				total += p[i].toUpperCase();
				//total += upper;
				//p[i] = str[i].toUpperCase();
				//p[i] = p[i].replace(p[i].toLowerCase(), p[i].toUpperCase());
			}
			
			
		}
		//console.log(lower);
		//console.log(upper);
		return total;
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};