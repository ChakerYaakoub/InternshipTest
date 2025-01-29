let generatedPoints = [];

function generatePoints() {
    const player1 = {
        name: document.getElementById('player1Name').value,
        level: parseInt(document.getElementById('player1Level').value)
    };
    const player2 = {
        name: document.getElementById('player2Name').value,
        level: parseInt(document.getElementById('player2Level').value)
    };

    generatedPoints = [];
    const totalPoints = 150;

    for (let i = 0; i < totalPoints; i++) {
        const totalLevel = player1.level + player2.level;
        const randomNum = Math.random() * totalLevel;
        const winner = randomNum <= player1.level ? player1.name : player2.name;
        generatedPoints.push(winner);
    }

    displayPoints();
    document.getElementById('calculateButton').style.display = 'block';
}

function displayPoints() {
    const pointsList = document.getElementById('pointsList');
    pointsList.innerHTML = '<div class="points-list">';
    generatedPoints.forEach((winner, index) => {
        pointsList.innerHTML += `<div>Point ${index + 1}: remporté par ${winner}</div>`;
    });
    pointsList.innerHTML += '</div>';
}

function calculateScore() {
    const player1 = {
        name: document.getElementById('player1Name').value,
        level: parseInt(document.getElementById('player1Level').value)
    };
    const player2 = {
        name: document.getElementById('player2Name').value,
        level: parseInt(document.getElementById('player2Level').value)
    };

    fetch('http://localhost:3000/calculate-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            points: generatedPoints,
            player1,
            player2
        })
    })
        .then(response => response.json())
        .then(score => displayScore(score, player1.name, player2.name));
}

function displayScore(score, player1Name, player2Name) {
    const scoreBoard = document.getElementById('scoreBoard');
    let html = `<h2>Résultat: ${score.winner ? 'Victoire de ' + score.winner : 'Jeu en cours, pas de vainqueur'}</h2>`;

    html += `<table>
        <tr>
            <th></th>
            <th>Set 1</th>
            <th>Set 2</th>
            <th>Set 3</th>
            <th>Set 4</th>
            <th>Set 5</th>
            <th>Current Game</th>
        </tr>
        <tr>
            <td>${player1Name}</td>
            ${score.sets.map(set => `<td>${set.player1}</td>`).join('')}
            <td>${score.currentGame.player1}</td>
        </tr>
        <tr>
            <td>${player2Name}</td>
            ${score.sets.map(set => `<td>${set.player2}</td>`).join('')}
            <td>${score.currentGame.player2}</td>
        </tr>
    </table>`;

    scoreBoard.innerHTML = html;
} 