
/* =========================================
   LAST STAND: ZOMBIE APOCALYPSE
   Main Menu JavaScript
   ========================================= */

// Game settings
const defaultSettings = {
    difficulty: "Normal",
    graphics: "High",
    shadows: true,
    sound: true,
    music: true
};

// Load saved settings
let settings = JSON.parse(
    localStorage.getItem("lastStandSettings")
) || defaultSettings;

// Check whether a saved game exists
let savedGame = JSON.parse(
    localStorage.getItem("lastStandSave")
);

// Main menu buttons
const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const settingsButton = document.getElementById("settingsButton");
const controlsButton = document.getElementById("controlsButton");

// Modal elements
const modal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalButton = document.getElementById("closeModal");

// Update Continue button
function updateContinueButton() {
    if (continueButton) {
        continueButton.disabled = !savedGame;

        if (!savedGame) {
            continueButton.textContent = "Continue Game (No Save)";
        } else {
            continueButton.textContent = "Continue Game";
        }
    }
}

// Open modal
function openModal(title, message) {
    if (!modal) return;

    modalTitle.textContent = title;
    modalText.textContent = message;
    modal.classList.add("active");
}

// Close modal
function closeModal() {
    if (modal) {
        modal.classList.remove("active");
    }
}

// Start New Game
function startNewGame() {
    openModal(
        "MISSION BRIEFING",
        "Welcome, soldier. Your mission is to survive the outbreak. The first mission and 3D gameplay are still being developed. Difficulty: " +
        settings.difficulty
    );
}

// Continue Game
function continueGame() {
    if (!savedGame) {
        openModal(
            "NO SAVED GAME",
            "No saved game was found. Select Start New Game to begin."
        );
        return;
    }

    openModal(
        "CONTINUE GAME",
        "Your saved game was found. Campaign gameplay is still being developed."
    );
}

// Open Settings
function openSettings() {
    openModal(
        "GAME SETTINGS",
        "Graphics: " + settings.graphics +
        "\nDifficulty: " + settings.difficulty +
        "\nSound: " + (settings.sound ? "ON" : "OFF") +
        "\nMusic: " + (settings.music ? "ON" : "OFF") +
        "\n\nSettings are saved in your browser."
    );
}

// Open Controls
function openControls() {
    openModal(
        "GAME CONTROLS",
        "W / A / S / D - Move\n" +
        "Mouse - Look and Aim\n" +
        "Left Click - Shoot\n" +
        "R - Reload\n" +
        "1 / 2 / 3 - Switch Weapons\n" +
        "Shift - Sprint\n" +
        "ESC - Pause Game"
    );
}

// Save settings
function saveSettings() {
    localStorage.setItem(
        "lastStandSettings",
        JSON.stringify(settings)
    );
}

// Change difficulty
function changeDifficulty(newDifficulty) {
    settings.difficulty = newDifficulty;
    saveSettings();
}

// Change graphics quality
function changeGraphics(newQuality) {
    settings.graphics = newQuality;
    saveSettings();
}

// Toggle sound
function toggleSound() {
    settings.sound = !settings.sound;
    saveSettings();
}

// Toggle music
function toggleMusic() {
    settings.music = !settings.music;
    saveSettings();
}

// Save game data
function saveGameData(gameData) {
    localStorage.setItem(
        "lastStandSave",
        JSON.stringify(gameData)
    );

    savedGame = gameData;
    updateContinueButton();
}

// Delete saved game
function deleteSavedGame() {
    localStorage.removeItem("lastStandSave");

    savedGame = null;
    updateContinueButton();
}

// Button event listeners
if (startButton) {
    startButton.addEventListener("click", startNewGame);
}

if (continueButton) {
    continueButton.addEventListener("click", continueGame);
}

if (settingsButton) {
    settingsButton.addEventListener("click", openSettings);
}

if (controlsButton) {
    controlsButton.addEventListener("click", openControls);
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
}

// Close modal when clicking outside it
if (modal) {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Initialize menu
updateContinueButton();
saveSettings();

console.log("Last Stand main menu loaded successfully!");
