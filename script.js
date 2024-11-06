const videos = [
    "https://www.youtube.com/embed/bT3XOzunPQY?si=qmgokzn89wiOmRvu",
    "https://www.youtube.com/embed/qSEeQXzFspk?si=eQtC5CiniI2Sre_t",
    "https://www.youtube.com/embed/lBHTwcqTdLI?si=X1euoofZUDCp5r3h",
    "https://www.youtube.com/embed/yc-vNb4zLkc?si=OwYWL6RP-bFS6OXn",
    "https://www.youtube.com/embed/AMP5pIcrq4I?si=UTp1pfflTZpx8IqQ"
]

let currentIndex = 0;
let player;
let isPlaying = false;

// Select the buttons by their IDs
const video = document.getElementById("youtube-player");
const btnLeft = document.getElementById("btn-left");
const toggleButton = document.getElementById("btn-toggle-play");
const icon = toggleButton.querySelector("i"); 
const btnRight = document.getElementById("btn-right");

// This function initializes the player after the API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        events: {
            onReady: onPlayerReady
        }
    });
}

function loadVideo(index) {
    video.src = videos[index]; // Update the video source
    video.play(); // Play the video automatically
}

//toggle button

toggleButton.addEventListener("click", () => {
    if (isPlaying) {
        player.pauseVideo();
        icon.classList.replace("fa-pause", "fa-play");
    } else {
        player.playVideo();
        icon.classList.replace("fa-play", "fa-pause");
    }
    isPlaying = !isPlaying;
    alert("clicked")
});

// Add click event listeners to each button
btnLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length; // Move to previous video
    loadVideo(currentIndex); // Load the new video
});



btnRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1 + videos.length) % videos.length; // Move to previous video
    loadVideo(currentIndex); // Load the new video
});