const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const tryAgainText = document.getElementById('try-again');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');

// This function handles the "Escape" logic
function moveButton() {
    tryAgainText.style.display = 'block';

    const yesRect = yesBtn.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    let newX, newY;
    let isSafe = false;

    // Try up to 50 times to find a spot that doesn't overlap with Yes
    for (let i = 0; i < 50; i++) {
        // Generate coordinates (with 20px padding from screen edges)
        newX = Math.random() * (window.innerWidth - btnWidth - 40) + 20;
        newY = Math.random() * (window.innerHeight - btnHeight - 40) + 20;

        // Create a "No-Go" zone around the Yes button (100px buffer)
        const buffer = 100;
        const forbiddenMinX = yesRect.left - buffer;
        const forbiddenMaxX = yesRect.right + buffer;
        const forbiddenMinY = yesRect.top - buffer;
        const forbiddenMaxY = yesRect.bottom + buffer;

        // Check if the new X and Y are outside that forbidden box
        const hitsX = newX > forbiddenMinX && newX < forbiddenMaxX;
        const hitsY = newY > forbiddenMinY && newY < forbiddenMaxY;

        if (!hitsX || !hitsY) {
            isSafe = true;
            break;
        }
    }

    // Apply the coordinates
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '1000'; // Ensure it's always on top of other elements
}

// Mouse for Desktop, Touchstart for Phone
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // This is the magic line that stops the "click" from happening
    moveButton();
});

yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    successSection.style.display = 'block';
});
