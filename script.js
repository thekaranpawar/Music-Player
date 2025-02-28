
const songs = [
  {
    name: 'A thousand years',
    path: './songs/Year.mp3',
    artist: 'Christina Perri',
    cover: './img/bg-thousand.jpeg'
  },
  {
    name: 'See You Again',
    path: './songs/seeYouAgain.mp3',
    artist: 'Paul Walker',
    cover: './img/bg-see.jpeg'
  },
  {
    name: 'Yalgaar',
    path: './songs/yalgaar.mp3',
    artist: 'CarryMinaty',
    cover: './img/bg-yalgaar.jpeg'
  },
  {
    name: 'Blinding nights',
    path: './songs/blinding.mp3',
    artist: 'The Weeknd',
    cover: './img/bg-blinding.jpeg'
  },
  {
    name: 'Night changes',
    path: './songs/night.mp3',
    artist: 'One Direction',
    cover: './img/bg-one-direction.jpeg'
  },
]

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const disk = document.querySelector(".disk");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    disk.classList.add("rotate");
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa play">&#xf04c;</i>'; 
  } else {
    audio.pause();
    disk.classList.remove("rotate");
    playPauseBtn.innerHTML = '<i class="fa pause">&#xf04b;</i>';
  }
});

let currentMusic = 0;
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");

const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const timeSlider = document.querySelector("#time-slider");

//   setMusic function

const setMusic = (i) => {
timeSlider.value = 0;
let song = songs[i];
currentMusic = i;
audio.src = song.path;
songName.innerHTML = song.name;
artistName.innerHTML = song.artist;
disk.style.backgroundImage = `url('${song.cover}')`;

currentTime.innerHTML = "00:00";
setTimeout(() => {
     timeSlider.max = audio.duration;
     songDuration.innerHTML = formatTime(audio.duration);
     }, 300);
}

setMusic(0);

//   Time format
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);  
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
}

//   Time Slider 
setInterval(() => {
  if (!audio.paused) {
    timeSlider.value = audio.currentTime;
    currentTime.innerHTML = formatTime(audio.currentTime);
  }
}, 1000); 

timeSlider.addEventListener("input", () => {
  audio.currentTime = timeSlider.value;
});

//  Next Button 
prevBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    --currentMusic;
  }
  setMusic(currentMusic);
  playPauseBtn.click();
});

//   Prev Button
nextBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    ++currentMusic;
  }
  setMusic(currentMusic);
  playPauseBtn.click();
});

// Automatically play the next song when the current ends
audio.addEventListener("ended", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0; 
  } else {
    ++currentMusic; 
  }
  setMusic(currentMusic);
  playPauseBtn.click();
});
