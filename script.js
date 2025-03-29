document.addEventListener("DOMContentLoaded", () => {
  const moodInput = document.getElementById("mood-input");
  const generateBtn = document.getElementById("generate-btn");
  const inputView = document.getElementById("input-view");
  const playlistView = document.getElementById("playlist-view");
  const moodDescription = document.getElementById("mood-description");
  const playlistItems = document.getElementById("playlist-items");
  const backBtn = document.getElementById("back-btn");

  generateBtn.addEventListener("click", async () => {
    const moodText = moodInput.value.trim();
    if (!moodText) {
      alert("Please enter your mood description.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: moodText }),
      });

      if (!response.ok) throw new Error("Failed to fetch mood analysis");

      const moodData = await response.json();
      console.log("Mood Analysis:", moodData);

      const topEmotion = Object.keys(moodData).reduce((a, b) => moodData[a] > moodData[b] ? a : b);
      moodDescription.textContent = `Detected Mood: ${topEmotion.charAt(0).toUpperCase() + topEmotion.slice(1)}`;

      generatePlaylist(topEmotion);
      inputView.style.display = "none";
      playlistView.style.display = "block";
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching mood data. Please try again.");
    }
  });

  backBtn.addEventListener("click", () => {
    playlistView.style.display = "none";
    inputView.style.display = "block";
  });

  function generatePlaylist(mood) {
    const moodToPlaylist = {
      joy: ["Happy - Pharrell Williams", "Uptown Funk - Bruno Mars", "Can't Stop the Feeling - Justin Timberlake"],
      sadness: ["Someone Like You - Adele", "Fix You - Coldplay", "Hallelujah - Jeff Buckley"],
      excitement: ["Eye of the Tiger - Survivor", "Don't Stop Me Now - Queen", "Thunderstruck - AC/DC"],
      calmness: ["Weightless - Marconi Union", "Clair de Lune - Debussy", "Sunflower - Post Malone"],
      nostalgia: ["Bohemian Rhapsody - Queen", "Take Me Home, Country Roads - John Denver", "Yesterday - The Beatles"]
    };

    playlistItems.innerHTML = "";
    const songs = moodToPlaylist[mood] || ["Default Song 1", "Default Song 2"];
    
    songs.forEach(song => {
      const li = document.createElement("li");
      li.textContent = song;
      playlistItems.appendChild(li);
    });
  }
});




