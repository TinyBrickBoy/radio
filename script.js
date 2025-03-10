// Audio-Player-Funktionalität
const audioPlayer = {
  audio: new Audio('https://onthepixel.stream.laut.fm/onthepixel'),
  isPlaying: false,
  playIcon: null,
  
  initialize() {
    this.playIcon = document.getElementById('play-icon');
    
    // Play/Pause-Event für Mobilgeräte
    this.audio.addEventListener('play', () => this.updatePlayState(true));
    this.audio.addEventListener('pause', () => this.updatePlayState(false));
    this.audio.addEventListener('ended', () => this.updatePlayState(false));
    
    // Automatisches Neuladen bei Verbindungsfehlern
    this.audio.addEventListener('error', () => {
      console.log('Audio stream error. Trying to reconnect...');
      setTimeout(() => {
        this.audio.src = 'https://onthepixel.stream.laut.fm/onthepixel';
        this.audio.load();
        if (this.isPlaying) {
          this.audio.play();
        }
      }, 3000);
    });
  },
  
  toggle() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      // Versuche, abzuspielen und behandle Fehler
      const playPromise = this.audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Playback error:', error);
          // Setze das Icon zurück, wenn das Abspielen fehlschlägt
          this.updatePlayState(false);
        });
      }
    }
  },
  
  updatePlayState(isPlaying) {
    this.isPlaying = isPlaying;
    
    if (this.playIcon) {
      this.playIcon.className = isPlaying ? 'fas fa-pause text-xl md:text-2xl' : 'fas fa-play text-xl md:text-2xl';
      
      // Finde die übergeordnete Pulsations-Div und aktualisiere die Animation
      const pulseElement = this.playIcon.closest('div');
      if (pulseElement) {
        if (isPlaying) {
          pulseElement.classList.remove('animate-pulse-slow');
          pulseElement.classList.add('scale-110');
        } else {
          pulseElement.classList.add('animate-pulse-slow');
          pulseElement.classList.remove('scale-110');
        }
      }
    }
  }
};

// Smooth Scroll für Anker-Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset für die fixierte Navigation
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialisiere den Audio-Player, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  audioPlayer.initialize();
  initSmoothScroll();
  
  // Setze das aktuelle Jahr im Footer
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Öffentliche Funktion zum Umschalten des Audios (wird vom HTML-Button aufgerufen)
function toggleAudio() {
  audioPlayer.toggle();
}
