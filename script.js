let currentIndex = 0;
let player;
let isPlaying = true;

// Select the buttons by their IDs
const video = document.getElementById("youtube-player");
const btnLeft = document.getElementById("btn-left");
const toggleButton = document.getElementById("btn-toggle-play");
const icon = toggleButton.querySelector("i"); 
const btnRight = document.getElementById("btn-right");

// This function initializes the player after the API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height:500,
        width:900,
        videoId: "hI9HQfCAw64",
        playerVars:{
            playerinline: 1,
            autoplay:1,
            controls:0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange:onPLayerStateChange
        }
    });
}

function onPlayerReady(){
    console.log("ready")
}

var done = false;

function onPLayerStateChange(event){
    if(event.data == YT.PlayerState.PLAYING && !done){
        done = true;
    }
}

const videoIndexes = [
    "hI9HQfCAw64",
    "ZFlpVBFSEis",
    "sBNr4iP57vI",
    "yc-vNb4zLkc",
    "6eyf9MNJvrg"
]

function loadVideo(index) {
    player.cueVideoById({videoId:videoIndexes[index]}); // Update the video source
    player.playVideo(); // Play the video automatically
}

//toggle button

toggleButton.addEventListener("click", () => {
    if (isPlaying) {
        icon.classList.replace("fa-pause", "fa-play");
        player.pauseVideo();
        isPlaying = !isPlaying;
    } else {
        icon.classList.replace("fa-play", "fa-pause");
        player.playVideo();
        isPlaying = !isPlaying;
    }
    
});

// Add click event listeners to each button
btnLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIndexes.length) % videoIndexes.length; // Move to previous video
    loadVideo(currentIndex); // Load the new video
});



btnRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1 + videoIndexes.length) % videoIndexes.length; // Move to previous video
    loadVideo(currentIndex); // Load the new video
});