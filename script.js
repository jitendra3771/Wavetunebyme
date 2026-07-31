

const songs = [
    {
        title: "Dream Lights",
        artist: "Alan Walker",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Night Sky",
        artist: "Imagine Dragons",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Stay With Me",
        artist: "OneRepublic",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    },
    {
        title: "Feel Alive",
        artist: "Coldplay",
        src: "songs/song4.mp3",
        cover: "images/cover4.jpg"
    },
    {
        title: "Golden Hour",
        artist: "The Chainsmokers",
        src: "songs/song5.mp3",
        cover: "images/cover5.jpg"
    }
];

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progressBar = document.getElementById("progressBar");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const search = document.getElementById("search");
const cards = document.querySelectorAll(".song-card");
const playAll = document.getElementById("playAll");

let currentSong = 0;
let isPlaying = false;



function loadSong(index){

    audio.src = songs[index].src;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;

}

loadSong(currentSong);



function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

}



function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

}



playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }

});



nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});



prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

});



cards.forEach(card=>{

    card.addEventListener("click",()=>{

        currentSong =
        Number(card.dataset.index);

        loadSong(currentSong);

        playSong();

    });

});



playAll.addEventListener("click",()=>{

    currentSong = 0;

    loadSong(currentSong);

    playSong();

});



audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progressBar.value =
        (audio.currentTime / audio.duration) * 100;

        currentTime.textContent =
        formatTime(audio.currentTime);

        duration.textContent =
        formatTime(audio.duration);

    }

});



progressBar.addEventListener("input",()=>{

    audio.currentTime =
    (progressBar.value / 100) * audio.duration;

});



volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});



audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();

});



search.addEventListener("keyup",()=>{

    let value =
    search.value.toLowerCase();

    cards.forEach(card=>{

        let text =
        card.innerText.toLowerCase();

        if(text.includes(value)){
            card.style.display = "flex";
        }else{
            card.style.display = "none";
        }

    });

});



function formatTime(time){

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;

}