const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


// Function to access camera and feed it to video tag.
function vedio_feed() {

	if( navigator.mediaDevices.getUserMedia ) {
		navigator.mediaDevices.getUserMedia( { video: true } )
			.then( ( stream)  => {

				// linking to video tag.
				video.srcObject = stream || URL.createObjectURL( stream );;
				video.play();
			} )
			.catch( ( err ) => {
				console.log( 'ERR ' + err );
			} );
	}
}

vedio_feed();


// Function to draw video contents to canvas element.
function canvas_draw() {

	// Getting height and width of video.
	const width = video.videoWidth;
	const height = video.videoHeight;

	// equalizing that dimension to canvas element.
	canvas.width = width;
	canvas.height = height;

	// drawing image on canvas after certain interval.
	// Return for clearing the interval started.
	return setInterval( () => {
		ctx.drawImage( video, 0, 0, width, height );

		// Getting image data such that pixels.
		let pixels = ctx.getImageData( 0, 0, width, height );

		// Changing pixels for particular filter.
		//pixels = redEffect( pixels );

		pixels = colorSplit( pixels );

		// Ghost effect.
		//ctx.globalAlpha = 0.1;
		
		//pixels = filterControl( pixels );

		ctx.putImageData( pixels, 0, 0 );
	}, 16 );
}


// Function for the snap sound linking with onclick on index page and others.
function takePhoto() {

	// Playing the sound.
	snap.currentTime = 0;
	snap.play();

	// Getting canvas data and get image of jpeg.
	let canvas_data = canvas.toDataURL( 'image/jpeg' );

	// creating anchor tag and linking it to canvas data for download.
	let link = document.createElement( 'a' );
	link.href = canvas_data;
	link.setAttribute( 'download', 'image' );

	link.innerHTML = `<img src=${canvas_data} alt="snapshot" />`;

	// Inserting the new clicked photo at the first.
	strip.insertBefore( link, strip.firstChild );
}


// Creating red effect filter.
function redEffect( pixels ) {

	// Changing rgb values.
	for( let i=0; i<pixels.data.length; i+=4 ) {
		pixels.data[i + 0] = pixels.data[i + 0] + 300;    // Color pixel change for red.
		pixels.data[i + 1] = pixels.data[i + 1] - 200;    // Color pixel change for green.
		pixels.data[i + 2] = pixels.data[i + 2] - 50;    // Color pixel change for blue.
	}

	return pixels;
}

// Another filter.
function colorSplit( pixels ) {

	// Changing rgb values.
	for( let i=0; i<pixels.data.length; i+=4 ) {
		pixels.data[i - 100] = pixels.data[i + 0];    // Color pixel change for red.
		pixels.data[i - 100] = pixels.data[i + 1];    // Color pixel change for green.
		pixels.data[i - 100] = pixels.data[i + 2];    // Color pixel change for blue.
	}

	return pixels;
}


// Another filter controled by input.
function filterControl( pixels ) {

	// Making object to store input values.
	let pixel_input = {};

	// Adding attributes to object.
	document.querySelectorAll( '.rgb input' ).forEach( ( input ) => {
		pixel_input[input.name] = input.value;
	} );

	//console.log( pixel_input );

	// Changing rgb values.
	for( let i=0; i<pixels.data.length; i+=4 ) {

		red = pixels.data[i + 0];      // Color pixel change for red.
		blue = pixels.data[i + 1];     // Color pixel change for green.
		green = pixels.data[i + 2];    // Color pixel change for blue.
		alpha = pixels.data[i + 3];    // Color pixel change for alpha.

		if( 
			red >= pixel_input.rmin && red <= pixel_input.rmax &&
			blue >= pixel_input.bmin && blue <= pixel_input.bmax &&
			green >= pixel_input.gmin && green <= pixel_input.gmax
		) {
			pixels.data[i + 3] = 0;
		}
	}

	return pixels;
}


// To automatically draw to canvas when the video is playing. 
video.addEventListener( 'canplay', canvas_draw );