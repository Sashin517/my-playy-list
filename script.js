let currentIndex = 0;
let player;
let isPlaying = false;

// Select the buttons by their IDs
const form = document.getElementById("form");
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
        videoId: "u83VdXAVq08",
        playerVars: {
            playsinline: 0,
            autoplay: 1,
            controls: 0
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
    if(event.data == YT.PlayerState.ENDED){
        currentIndex = (currentIndex + 1 + videoIndexes.length) % videoIndexes.length; // Move to previous video
        loadVideo(currentIndex); // Load the new video
    }
}

let videoIndexes = [
    "u83VdXAVq08",
    "ajGo94h0JxE"
]

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    if (document.getElementById('url').value == ''){
        alert('please enter a yt url')
    }else{
        let url = document.getElementById('url').value;
        let id  = getUrlId(url);
        videoIndexes.push(id);
        alert(`added to que successfully ${id}`);
    }
});

function getUrlId(url) {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


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