// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const themeToggleIcon = document.querySelector(".theme-toggle-icon")
const moodInput = document.getElementById("mood-input")
const energySlider = document.getElementById("energy-slider")
const generateBtn = document.getElementById("generate-btn")
const backBtn = document.getElementById("back-btn")
const regenerateBtn = document.getElementById("regenerate-btn")
const inputView = document.getElementById("input-view")
const playlistView = document.getElementById("playlist-view")
const playlistItems = document.getElementById("playlist-items")
const moodDescription = document.getElementById("mood-description")

// Mock data for playlist generation
const mockArtists = [
  "The Mood Lifters",
  "Emotional Echo",
  "Feeling Fine",
  "Vibe Collective",
  "Sentiment",
  "The Expressions",
  "Mood Swing",
  "Emotional Intelligence",
  "The Feelings",
  "State of Mind",
  "Wavelength",
  "The Atmosphere",
]

const mockSongsByMood = {
  happy: [
    "Sunshine Smile",
    "Joy Ride",
    "Happy Days",
    "Upbeat Rhythm",
    "Positive Vibes",
    "Cheerful Morning",
    "Bright Side",
    "Good Times",
  ],
  sad: [
    "Rainy Day",
    "Blue Memories",
    "Missing You",
    "Melancholy Nights",
    "Teardrops",
    "Lonely Road",
    "Fading Away",
    "Silent Tears",
  ],
  energetic: [
    "Power Up",
    "Adrenaline Rush",
    "Full Speed",
    "Energy Boost",
    "Unstoppable",
    "Lightning Strike",
    "Maximum Drive",
    "Turbo Mode",
  ],
  calm: [
    "Peaceful Mind",
    "Gentle Breeze",
    "Quiet Moments",
    "Tranquil Waters",
    "Serene Space",
    "Soft Whispers",
    "Calm Reflections",
    "Still Waters",
  ],
  reflective: [
    "Deep Thoughts",
    "Inner Journey",
    "Soul Searching",
    "Retrospect",
    "Looking Back",
    "Self Discovery",
    "Mind Wandering",
    "Introspection",
  ],
}

// Initialize the application
function init() {
  // Set up event listeners
  themeToggle.addEventListener("click", toggleTheme)
  moodInput.addEventListener("input", autoResizeTextarea)
  generateBtn.addEventListener("click", generatePlaylist)
  backBtn.addEventListener("click", showInputView)
  regenerateBtn.addEventListener("click", generatePlaylist)

  // Initialize textarea height
  autoResizeTextarea()
}

// Toggle between light and dark themes
function toggleTheme() {
  const body = document.body
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode")
    body.classList.add("dark-mode")
    themeToggleIcon.textContent = "☀️"
  } else {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
    themeToggleIcon.textContent = "🌙"
  }
}

// Auto-resize textarea based on content
function autoResizeTextarea() {
  moodInput.style.height = "auto"
  moodInput.style.height = moodInput.scrollHeight + "px"
}

// Switch to playlist view and generate playlist
function generatePlaylist() {
  // Get user input
  const mood = moodInput.value.trim()
  const energyLevel = energySlider.value

  // Validate input
  if (!mood) {
    moodInput.focus()
    return
  }

  // Update mood description
  moodDescription.textContent = `Based on your mood: "${truncateText(mood, 60)}" with energy level ${energyLevel}/10`

  // Generate playlist items
  generatePlaylistItems(mood, energyLevel)

  // Switch to playlist view
  inputView.classList.remove("active")
  playlistView.classList.add("active")
}

// Generate playlist items based on mood and energy level
function generatePlaylistItems(mood, energyLevel) {
  // Clear existing playlist
  playlistItems.innerHTML = ""

  // Determine mood category based on input text
  const moodCategory = determineMoodCategory(mood)

  // Generate 5 playlist items
  for (let i = 0; i < 5; i++) {
    const songTitle = getRandomSong(moodCategory)
    const artist = getRandomArtist()

    // Create playlist item
    const listItem = document.createElement("li")
    listItem.className = "playlist-item"
    listItem.style.animationDelay = `${(i + 1) * 0.1}s`

    // Create song title and artist elements
    const titleElement = document.createElement("div")
    titleElement.className = "song-title"
    titleElement.textContent = songTitle

    const artistElement = document.createElement("div")
    artistElement.className = "song-artist"
    artistElement.textContent = artist

    // Append elements to list item
    listItem.appendChild(titleElement)
    listItem.appendChild(artistElement)

    // Append list item to playlist
    playlistItems.appendChild(listItem)
  }
}

// Determine mood category based on input text
function determineMoodCategory(mood) {
  const moodLower = mood.toLowerCase()

  // Simple keyword matching for mood detection
  if (moodLower.match(/happy|joy|excited|great|good|wonderful|fantastic/)) {
    return "happy"
  } else if (moodLower.match(/sad|down|blue|depressed|unhappy|miserable/)) {
    return "sad"
  } else if (moodLower.match(/energetic|active|pumped|motivated|ready/)) {
    return "energetic"
  } else if (moodLower.match(/calm|peaceful|relaxed|chill|quiet/)) {
    return "calm"
  } else if (moodLower.match(/thoughtful|reflective|pensive|thinking/)) {
    return "reflective"
  }

  // Default to a random category if no match
  const categories = Object.keys(mockSongsByMood)
  return categories[Math.floor(Math.random() * categories.length)]
}

// Get a random song from the specified mood category
function getRandomSong(moodCategory) {
  const songs = mockSongsByMood[moodCategory]
  return songs[Math.floor(Math.random() * songs.length)]
}

// Get a random artist
function getRandomArtist() {
  return mockArtists[Math.floor(Math.random() * mockArtists.length)]
}

// Switch back to input view
function showInputView() {
  playlistView.classList.remove("active")
  inputView.classList.add("active")
}

// Helper function to truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", init)
