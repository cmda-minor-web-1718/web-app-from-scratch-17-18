
// Deze functie zorgt er voor dat sectie 3 en sectie twee elkaar afwisselen.
// het is me helaas nog niet gelukt om de navigatie bij click te veranderen naar show/hide best practices
// het aanpassen van de html tekst wil ik wel nog gaan doen


(function () {
	'use strict'
	var section3 = document.querySelector('.section3');
	var section2 = document.querySelector('.section2');
	var start = document.querySelector('.start');
	var bestPractices = document.querySelector('nav');

		bestPractices.addEventListener('click', function () {
				section3.classList.toggle('hidden');
				section2.classList.toggle('hidden');
		});


	})();








