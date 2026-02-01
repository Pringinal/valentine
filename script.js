const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const tryAgainText = document.getElementById('try-again');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');

// Array of messages to cycle through
const messages = [
    "Nice try! Try again. 😉",
    "Too slow! 🏃‍♂️",
    "Not that easy! 😜",
    "Are you even trying? ❤️",
    "Wrong button! ❌",
    "You're persistent, I'll give you that!",
    "Just click Yes already! 🥺",
    "Calculated escape! 🤖"
];

let messageIndex = 0;

function moveButton(e) {
    // Prevent default touch behavior so it doesn't "click"
    if (e) e.preventDefault();

    // Change the text
    tryAgainText.style.display = 'block';
    tryAgainText.innerText = messages[messageIndex];
    
    // Cycle through messages
    messageIndex = (messageIndex + 1) % messages.length;

    const yesRect = yesBtn.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    let newX, newY;
    let isSafe = false;

    // Try to find a safe spot away from the Yes button
    while (!isSafe) {
        newX = Math.random() * (window.innerWidth - btnWidth - 40) + 20;
        newY = Math.random() * (window.innerHeight - btnHeight - 40) + 20;

        // Buffer zone around the Yes button
        const buffer = 120; 
        const hitsX = newX > (yesRect.left - buffer) && newX < (yesRect.right + buffer);
        const hitsY = newY > (yesRect.top - buffer) && newY < (yesRect.bottom + buffer);

        // If it's not overlapping with Yes, it's safe
        if (!hitsX || !hitsY) {
            isSafe = true;
        }
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// Event Listeners
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    successSection.style.display = 'block';
});
