var audio = new Audio('http://onthepixel.stream.laut.fm/onthepixel');
var isPlaying = false;
function toggleAudio() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updatePlayButton();
}
function updatePlayButton() {
  var playButton = document.querySelector('.play-button');
  playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}