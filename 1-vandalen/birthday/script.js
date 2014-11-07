"use strict";

window.onload = function(){

	
	var birthday = function(date){
		

			console.log(date);
			// Din kod här.
			if(!isNaN(new Date(date).getTime())){
				
				var birth = new Date(date);	
				
				var today = new Date();
			
				var oneDay=1000*60*60*24; 
				
				birth.setFullYear(today.getFullYear());
				
				today.setDate(today.getDate()-1); // tar bort fel marginal på en dag.
				
				if(today > birth){ // kollar om man redan fyllt år. 
					birth.setFullYear(today.getFullYear()+1); 
				}
				
				var toNextDay = Math.floor((birth - today) / (oneDay));
				return toNextDay;
			}
			
			throw new Error('Feel du måste ange ÅÅÅÅ-MM-DD');

			
			
			
			
			
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};