let currentIndex = 0;
let player;
let isPlaying = true;
let videoIndexes = [
    "kXShLPXfWZA",
    "Fu2PbiqlrcQ"
];
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
        height: 500,
        width: 900,
        videoId: videoIndexes[currentIndex],
        playerVars: {
            'playsinline': 0,
            'controls': 0,
            'autoplay': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// This function retrieves the video title
function getVideoTitle() {
    const videoData = player.getVideoData();
    
    // Check if the title already exists in the videoTitles array
    if (!videoTitles.includes(videoData.title)) {
        videoTitles.push(videoData.title); // Add the title if it is not already in the array
        playList.innerHTML = playListfunc(); // Update the playlist display
    }
}

// Called when the player is ready
function onPlayerReady(event) {
    getVideoTitle(); // Adds title when the player is ready
}

// Called when player state changes, e.g., a new video starts playing
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        getVideoTitle(); // Adds title when the video starts playing
    }

    if (event.data === YT.PlayerState.ENDED) {
        if (isPlaying) {
            toggleButton.click(); // Toggle play state if isPlaying is true
        }
        btnRight.click(); // Move to the next video
    }
}


// Function to display all video titles in the playlist
function playListfunc() {
    let allTitles = '';
    videoTitles.forEach((videoTitle, index) => {
        console.log(videoTitle);
        allTitles += `<div>${index+1}) ${videoTitle}</div>`;// Add each title with a line break
    })
    return allTitles;
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
	autoPlay();
}

toggleButton.addEventListener("click", () => {
	
    if (isPlaying) {
        icon.classList.replace("fa-pause", "fa-play");
		
		if(autoPlayInterval != undefined) {
			clearInterval(autoPlayInterval);
		}
        player.pauseVideo();
        isPlaying = false;
    } else {
        icon.classList.replace("fa-play", "fa-pause");
        player.playVideo();
        isPlaying = true;
    }
    
});

// Add click event listeners to each button
btnLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIndexes.length) % videoIndexes.length; // Move to previous video
	if(isPlaying) {
			toggleButton.click();
	}
    loadVideo(currentIndex); // Load the new video
});



btnRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1 + videoIndexes.length) % videoIndexes.length; // Move to next video
	if(isPlaying) {
			toggleButton.click();
	}
    loadVideo(currentIndex); // Load the new video
});


var autoPlayInterval;

function checkAutoPlay() {
	
	if(player.getPlayerState() != 1) {
        if(icon.classList.contains("fa-pause")){
            icon.classList.replace("fa-pause", "fa-play");
        }
		isPlaying = false;
	
	} else {		
		if(icon.classList.contains("fa-play")) {			
			icon.classList.replace("fa-play", "fa-pause");
		}
		player.playVideo();
		isPlaying = true;
		clearInterval(autoPlayInterval);
		autoPlayInterval = undefined;
	}
	
}

function autoPlay() {	
	autoPlayInterval = setInterval(checkAutoPlay, 3000);
}