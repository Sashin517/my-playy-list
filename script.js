const videos = [
    "assets/videos/7320512775380405536.mp4",
    "assets/videos/CB4204CD4B67A6D2367E40B3690882BD_video_dashinit.mp4",
    "assets/videos/MONKEY.mp4",
    "assets/videos/youtube_u83VdXAVq08_1920x1080_h264.mp4"
]

let currentIndex = 0;

// Select the buttons by their IDs
const video = document.getElementById("video");
const btnLeft = document.getElementById("btn-left");
const toggleButton = document.getElementById("btn-toggle-play");
const icon = toggleButton.querySelector("i"); 
const btnRight = document.getElementById("btn-right");

function loadVideo(index) {
    video.src = videos[index]; // Update the video source
    video.play(); // Play the video automatically
}

//toggle button
toggleButton.addEventListener("click", () => {
    if (video.paused) {
        video.play(); // Play the video
        icon.classList.replace("fa-play", "fa-pause"); // Change icon to "pause"
    } else {
        video.pause(); // Pause the video
        icon.classList.replace("fa-pause", "fa-play"); // Change icon to "play"
    }
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