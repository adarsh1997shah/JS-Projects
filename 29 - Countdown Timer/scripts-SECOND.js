const timerButtons = document.querySelectorAll( '.timer__button' );
const displayTime = document.querySelector( '.display__time-left' );
const displaytEndTime = document.querySelector( '.display__end-time' );
const form = document.getElementById( 'custom' );
const input = document.querySelector( 'input[name=minutes]' );

let interval;

function currentSecs() {

	let currentTime = new Date();
	let currentHours = parseInt(currentTime.getHours());
	let currentMin = parseInt(currentTime.getMinutes());
	if( currentHours > 12 ) {
		currentHours = currentHours - 12;
	}

	// Converting current date and time to secs.
	let currentSec = (currentHours * 3600) + (currentMin * 60);
	return currentSec;
}

function handleClick( e ) {

	clearInterval( interval );

	// getting time from data-time attribute.
	let sec = parseInt(e.target.dataset.time);

	let totalSec = currentSecs() + sec;
	let returnHour = parseInt(totalSec / 3600);
	let returnMin = parseInt( (totalSec % 3600) / 60 );

	// running every single sec
	interval = setInterval( () => {

		// looping secs to zero.
		if( sec > 0 ) {
			sec-- ;
		}

		// calc everytime the sec decreases.
		let hourleft = parseInt(sec / 3600);
		let minleft = parseInt( (sec % 3600) / 60 );
		let secleft = parseInt( sec % 60 );

		displayTime.textContent = hourleft + ':' + minleft + ':' + secleft;

	}, 1000 );

	displaytEndTime.textContent = 'Be back at ' + returnHour + ':' + returnMin;
}


function handleSubmit( e ) {
	
	e.preventDefault();
	clearInterval( interval );
	
	let sec = parseInt(input.value) * 60;

	let totalSec = currentSecs() + sec;
	let returnHour = parseInt(totalSec / 3600);
	let returnMin = parseInt( (totalSec % 3600) / 60 );

	// running every single sec
	interval = setInterval( () => {

		// looping secs to zero.
		if( sec > 0 ) {
			sec-- ;
		}

		// calc everytime the sec decreases.
		let hourleft = parseInt(sec / 3600);
		let minleft = parseInt( (sec % 3600) / 60 );
		let secleft = parseInt( sec % 60 );

		displayTime.textContent = hourleft + ':' + minleft + ':' + secleft;

	}, 1000 );

	displaytEndTime.textContent = 'Be back at ' + returnHour + ':' + returnMin;

}

timerButtons.forEach( ( timerButton ) => timerButton.addEventListener( 'click', handleClick ) );
form.addEventListener( 'submit', handleSubmit );