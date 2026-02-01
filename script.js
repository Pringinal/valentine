const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const tryAgainText = document.getElementById('try-again');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents mobile "ghost clicks"
    moveButton();
});

function moveButton() {
    tryAgainText.style.display = 'block';

    const yesRect = yesBtn.getBoundingClientRect();
    const padding = 50; // Minimum distance in pixels from the Yes button

    let newX, newY;
    let isOverlapping = true;

    // Keep generating coordinates until we find a spot far enough from Yes
    while (isOverlapping) {
        newX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        newY = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        // Define the "Forbidden Zone" around the Yes button
        const forbiddenMinX = yesRect.left - padding;
        const forbiddenMaxX = yesRect.right + padding;
        const forbiddenMinY = yesRect.top - padding;
        const forbiddenMaxY = yesRect.bottom + padding;

        // Check if the new random coordinates fall inside the forbidden zone
        const hitsX = newX > forbiddenMinX && newX < forbiddenMaxX;
        const hitsY = newY > forbiddenMinY && newY < forbiddenMaxY;

        if (!(hitsX && hitsY)) {
            isOverlapping = false;
        }
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    successSection.style.display = 'block';
});
