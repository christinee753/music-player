const playBtn = document.getElementById("play");
const audio = document.getElementById("audio");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const progress = document.querySelector(".progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const cover = document.getElementById("cover");
let coverAnimation;


const songs = [
    "Once In A While I Dream - Tama Shutts.mp3",
    "Halfway In - Anno Domini Beats.mp3"
];

let songIndex = 0;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}


audio.addEventListener("loadedmetadata", function() {
    duration.innerText = formatTime(audio.duration);
});

loadSong(songs[songIndex]);

function playSong() {
    audio.play();
    playBtn.innerText = "Pause";

    if (coverAnimation) {
        coverAnimation.play();
    } else {
        coverAnimation = cover.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.08)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 1500,
                iterations: Infinity
            }
        );
    }
}

function pauseSong() {
    audio.pause();
    playBtn.innerText = "Play";

    if (coverAnimation) {
        coverAnimation.pause();
    }
}

playBtn.addEventListener("click", function() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

   nextBtn.addEventListener("click", function() {
    songIndex = songIndex + 1;

        if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}); 

prevBtn.addEventListener("click", function() {
    songIndex = songIndex - 1;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
});

audio.addEventListener("timeupdate", function() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + "%";

    currentTime.innerText = formatTime(audio.currentTime);
});


audio.addEventListener("loadedmetadata", function() {
    duration.innerText = formatTime(audio.duration);
});

const progressContainer = document.querySelector(".progress-container");

progressContainer.addEventListener("click", function(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    audio.currentTime = (clickPosition / width) * audio.duration;
});

audio.addEventListener("ended", function() {
    songIndex = songIndex + 1;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
});
});
