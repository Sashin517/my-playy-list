let currentIndex = 0;
let player;
let isPlaying = true;
let videoIndexes = ["u83VdXAVq08"];
let videoTitles = [];

// Select the buttons by their IDs
const form = document.getElementById("form");
const playList = document.getElementById("play-list");
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
        videoId: videoIndexes[currentIndex],
        playerVars: {
            playsinline: 1,
            autoplay: 1,
            controls: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange:onPLayerStateChange
        }
    });
}

// Function that runs when the player is ready
function onPlayerReady(event) {
    // Get the video title using getVideoData() method
    videoTitles.push(event.target.getVideoData().title);
    playListfunc();
}

function playListfunc(){
    let allTitles = '';
    for(videoTitle of videoTitles){
        console.log(videoTitle);
        allTitles += videoTitle;
    }
    playList.innerHTML = allTitles;
}

var done = false;

function onPLayerStateChange(event){
    if(event.data == YT.PlayerState.ENDED){
        currentIndex = (currentIndex + 1 + videoIndexes.length) % videoIndexes.length; // Move to previous video
        loadVideo(currentIndex); // Load the new video
    }
}

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
    const regex = /\/([^/?]+)\?/;
    const match = url.match(regex);
    return match ? match[1] : alert('please enter valid url');
}

function loadVideo(index) {
    player.cueVideoById({videoId:videoIndexes[index]}); // Update the video source
    player.playVideo();
    isPlaying = !isPlaying;
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