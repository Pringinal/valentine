const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const tryAgainText = document.getElementById('try-again');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');

// Function to move the "No" button to a random position
noBtn.addEventListener('mouseover', () => {
    // Show the "Try again" message
    tryAgainText.style.display = 'block';

    // Calculate random coordinates within the screen bounds
    // Subtracting button width/height to keep it within view
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.position = 'fixed'; // Overrides the relative wrapper
});

// For mobile users who tap "No"
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

// Handle the "Yes" click
yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    successSection.style.display = 'block';
});