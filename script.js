const image = document.querySelector('img');
const title = document.getElementById('title');
const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//check if playing
let isPlaying =false;

//Music 
const songs = [
    {
        name: '01 - Luftrauser',
        displayName: '01 - Luftrauser',
        artist: ' Jukio Kallio',
    },
    {
        name: '07 - Assaultrauser',
        displayName: '07 - Assaultrauser',
        artist: ' Jukio Kallio',
    },
    {
        name: '08 - Trickrauser',
        displayName: '08 - Trickrauser',
        artist: ' Jukio Kallio',
    },
];



// play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

//play-pause listener
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()))

// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// currenet song
let songIndex= 0;
//next song
function nextSong() {
    songIndex++;
    if (songIndex> songs.length-1)
    {
        songIndex=0;
    }
 
    loadSong(songs[songIndex]);
    playSong();
}

//previous button
function prevSong() {
    if (songIndex<1)
    {
songIndex = songs.length -1;
    }
    songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}

//on load select first song
loadSong(songs[songIndex]);

// updateProgressBar and time
function updateProgressBar(e){
    if (isPlaying){
        const{ duration, currentTime}= e.srcElement;
        // Update PB
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if (durationSeconds<10){
            durationSeconds= `0${durationSeconds}`;
        }
      
        // delay NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
       //calculate display for duration
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if (currentSeconds<10){
            currentSeconds= `0${currentSeconds}`;
        }
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }

        }
}
function setPB(e){

    const width = this.clientWidth;
    const clickX= e.offsetX;
    const{duration}= music;

    music.currentTime = (clickX/width)*duration;
}
//event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setPB)