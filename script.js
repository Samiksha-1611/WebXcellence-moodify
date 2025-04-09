// Mood detection and theme application
function applyMoodTheme(mood) {
  const root = document.documentElement;
  switch (mood) {
    case 'happy':
      root.style.setProperty('--background-color', '#fff9e6');
      root.style.setProperty('--font-color', '#d63031');
      root.style.setProperty('--primary-color', '#fdcb6e');
      root.style.setProperty('--secondary-color', '#ffeaa7');
      break;
    case 'sad':
      root.style.setProperty('--background-color', '#f0f8ff');
      root.style.setProperty('--font-color', '#0984e3');
      root.style.setProperty('--primary-color', '#74b9ff');
      root.style.setProperty('--secondary-color', '#dfe6e9');
      break;
    case 'angry':
      root.style.setProperty('--background-color', '#ffefed');
      root.style.setProperty('--font-color', '#d63031');
      root.style.setProperty('--primary-color', '#ff7675');
      root.style.setProperty('--secondary-color', '#fab1a0');
      break;
    case 'calm':
      root.style.setProperty('--background-color', '#e8f8f5');
      root.style.setProperty('--font-color', '#00b894');
      root.style.setProperty('--primary-color', '#55efc4');
      root.style.setProperty('--secondary-color', '#81ecec');
      break;
    default:
      root.style.setProperty('--background-color', '#f8f9fa');
      root.style.setProperty('--font-color', '#2d3436');
      root.style.setProperty('--primary-color', '#6c5ce7');
      root.style.setProperty('--secondary-color', '#dfe6e9');
  }
}

// Music data
const moodPlaylists = {
  happy: [
    { 
      title: "Happy – Pharrell Williams", 
      duration: 233,
      cover: "https://i.scdn.co/image/ab67616d00001e02df9a35baaa98675256b3518a"
    },
    { 
      title: "Can't Stop the Feeling – Justin Timberlake", 
      duration: 237,
      cover: "https://i.scdn.co/image/ab67616d00001e02a48964b5d9a3d6968ae3e0de"
    },
    { 
      title: "Don't Stop Me Now – Queen", 
      duration: 210,
      cover: "https://i.scdn.co/image/ab67616d00001e02ce4f1737bc8a646c8c4bd25a"
    }
  ],
  sad: [
    { 
      title: "Let Her Go – Passenger", 
      duration: 253,
      cover: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268"
    },
    { 
      title: "Someone Like You – Adele", 
      duration: 285,
      cover: "https://i.scdn.co/image/ab67616d00001e0234051d7a2e6b9d31ca7c6d4e"
    },
    { 
      title: "The Scientist – Coldplay", 
      duration: 309,
      cover: "https://i.scdn.co/image/ab67616d00001e028950d0a9b1a3fdd9d4e6b8c3"
    }
  ],
  angry: [
    { 
      title: "Breaking the Habit – Linkin Park", 
      duration: 196,
      cover: "https://i.scdn.co/image/ab67616d00001e02a9f6c04ba168640b48aa5795"
    },
    { 
      title: "Lose Yourself – Eminem", 
      duration: 326,
      cover: "https://i.scdn.co/image/ab67616d00001e02f1e75e8c4c8e9a6b2a9b0c5d"
    },
    { 
      title: "Bulls On Parade – Rage Against the Machine", 
      duration: 228,
      cover: "https://i.scdn.co/image/ab67616d00001e02a3a0b5e8b3d0e5e4e3b3c5d2"
    }
  ],
  calm: [
    { 
      title: "Weightless – Marconi Union", 
      duration: 480,
      cover: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268"
    },
    { 
      title: "Sunset Lover – Petit Biscuit", 
      duration: 221,
      cover: "https://i.scdn.co/image/ab67616d00001e02a3a0b5e8b3d0e5e4e3b3c5d2"
    },
    { 
      title: "Clair de Lune – Claude Debussy", 
      duration: 345,
      cover: "https://i.scdn.co/image/ab67616d00001e02b1c4b76e23414c9f20242268"
    }
  ]
};

// Player state
let currentMood = '';
let currentPlaylist = [];
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();
let progressInterval;

// Page navigation
function showPlayerPage() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('player-page').style.display = 'block';
}

function goBack() {
  document.getElementById('player-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
  stopAudio();
  // Reset to default theme
  applyMoodTheme('');
}

// Player functions
function loadSong(index) {
  const song = currentPlaylist[index];
  document.getElementById('now-playing').textContent = song.title;
  document.getElementById('album-art').style.backgroundImage = `url(${song.cover})`;
  document.getElementById('total-time').textContent = formatTime(song.duration);
  
  // In a real app, you would set audio.src to the actual audio file
  // audio.src = song.audioFile;
}

function togglePlay() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  isPlaying = true;
  document.getElementById('play-btn').textContent = '⏸';
  
  // Simulate audio playback progress
  const song = currentPlaylist[currentSongIndex];
  let currentTime = 0;
  
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    currentTime += 1;
    if (currentTime >= song.duration) {
      nextSong();
      return;
    }
    
    document.getElementById('current-time').textContent = formatTime(currentTime);
    const progressPercent = (currentTime / song.duration) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
  }, 1000);
}

function pauseAudio() {
  isPlaying = false;
  document.getElementById('play-btn').textContent = '▶';
  clearInterval(progressInterval);
}

function stopAudio() {
  pauseAudio();
  document.getElementById('current-time').textContent = '0:00';
  document.getElementById('progress-bar').style.width = '0%';
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    playAudio();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    playAudio();
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function displaySuggestions() {
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = '';
  
  currentPlaylist.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.onclick = () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playAudio();
    };
    suggestionsList.appendChild(li);
  });
}

// Mood selection function
function selectMood(mood) {
  currentMood = mood;
  
  // Apply theme
  applyMoodTheme(currentMood);
  
  // Set playlist
  currentPlaylist = moodPlaylists[currentMood];
  currentSongIndex = 0;
  
  // Update UI
  document.getElementById('mood-header').textContent = `${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood`;
  
  // Show player page
  showPlayerPage();
  
  // Load first song
  loadSong(currentSongIndex);
  
  // Display suggestions
  displaySuggestions();
}