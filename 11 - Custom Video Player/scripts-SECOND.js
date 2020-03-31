let player = document.querySelector( '.player' );
let video = player.querySelector( '.viewer' );
let toggle = player.querySelector( '.toggle' );
let skip = player.querySelectorAll( '[data-skip]' );
let progressFilled = player.querySelector( '.progress__filled' );
let progress = player.querySelector( '.progress' );
let volume = player.querySelector( 'input[name="volume"]' );
let playbackRate = player.querySelector( 'input[name="playbackRate"]' );
let fullScreen = player.querySelector( '.fullScreen' );



function play_toggle(e) {
    if( video.paused ) {
        video.play();
    } else {
        video.pause();
    }
}


function updateButton() {
    const icon = this.paused? '►' : '❚ ❚';
    toggle.textContent = icon;
}


function handleSkip() {
    const skipTime = this.dataset.skip;
    video.currentTime += parseFloat( skipTime );
}


function handleProgress() {
    const time = ( video.currentTime/video.duration ) * 100;
    progressFilled.style.flexBasis = `${time}%`;
}


function handlePlayback(e) {
    let click = (((e.offsetX/640) * 100 ) / 100) * video.duration;
    video.currentTime = click;
}


function handleVolume() {
    video.volume = this.value;
}

function handleplaybackRate() {
    video.playbackRate = this.value;
}



/* View in fullscreen */
function openFullscreen() {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.mozRequestFullScreen) { /* Firefox */
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { /* IE/Edge */
        player.msRequestFullscreen();
    }
}



video.addEventListener( 'click', play_toggle );
video.addEventListener( 'play', updateButton );
video.addEventListener( 'pause', updateButton );
video.addEventListener( 'timeupdate', handleProgress );

toggle.addEventListener( 'click', play_toggle );

skip.forEach( ( button ) => button.addEventListener( 'click', handleSkip ) );

progress.addEventListener( 'click', handlePlayback );

volume.addEventListener( 'input', handleVolume );
playbackRate.addEventListener( 'input', handleplaybackRate );
fullScreen.addEventListener( 'click', openFullscreen )
