let score = 0;
let flippedCards = [];

function flipCard(card) {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000); // Wait for the flip animation to complete
        }
    }
}

function checkForMatch() {
    const card1Type = flippedCards[0].querySelector('.card-back p').textContent.trim();
    const card2Type = flippedCards[1].querySelector('.card-back p').textContent.trim();

    if (card1Type === 'Birth' && card2Type === 'Life' ||
        card1Type === 'Life' && card2Type === 'Birth') {
        updateScore(100); // Matched Birth and Life
    } else if (card1Type === 'Death' && card2Type === 'Life' ||
        card1Type === 'Life' && card2Type === 'Death') {
        updateScore(-100); // Matched Death and Life
    } else {
        updateScore(25); // No match, add 25 points
    }

    resetFlippedCards();
}

function updateScore(points) {
    score += points;
    document.querySelector('.right-info').textContent = `Score: ${score}`;
    const cardsContainer = document.querySelector('.cards');
    for (let i = cardsContainer.children.length; i >= 0; i--) {
        cardsContainer.appendChild(cardsContainer.children[Math.random() * i | 0]);
    }
}

function resetFlippedCards() {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
}

// Shuffle cards on page load
document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cards');
    for (let i = cardsContainer.children.length; i >= 0; i--) {
        cardsContainer.appendChild(cardsContainer.children[Math.random() * i | 0]);
    }
});
