const apiUrl = 'http://localhost:3000';

let generatedPoints = [];
let player1 = {
    name: '',
    level: 0
};
let player2 = {
    name: '',
    level: 0
};



function generatePoints() {
    try {
        player1.name = document.getElementById('player1Name').value;
        player1.level = parseInt(document.getElementById('player1Level').value);
        player2.name = document.getElementById('player2Name').value;
        player2.level = parseInt(document.getElementById('player2Level').value);

        if (!player1.name || !player2.name || !player1.level || !player2.level) {
            alert('Please fill all fields');
            return;
        }

        if (player1.level < 1 || player1.level > 10 || player2.level < 1 || player2.level > 10) {
            alert('Player level must be between 1 and 10');
            return;
        }

        if (player1.name === player2.name) {
            alert('Players must have different names');
            return;
        }

        const totalPoints = 150;
        const pointsList = document.getElementById('pointsList');
        if (!pointsList) {
            throw new Error('Points list element not found');
        }

        generatedPoints = [];
        let pointsHtml = '<h3>Generated Points:</h3>';

        for (let i = 0; i < totalPoints; i++) {
            const totalLevel = player1.level + player2.level;
            const randomNum = Math.random() * totalLevel;
            const winner = randomNum <= player1.level ? 0 : 1;
            const winnerName = winner === 0 ? player1.name : player2.name;

            generatedPoints.push(winner);
            pointsHtml += `<div>Point ${i + 1}: won by ${winnerName}</div>`;
        }

        pointsList.innerHTML = pointsHtml;
        const simulateButton = document.getElementById('simulateButton');
        if (simulateButton) {
            simulateButton.style.display = 'block';
        }
    } catch (error) {
        console.error('Error generating points:', error);
        alert('An error occurred while generating points. Please try again.');
    }
}

function simulateMatch() {
    try {
        if (generatedPoints.length === 0) {
            alert('Please generate points first');
            return;
        }

        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = 'Simulating match...';
        loadingDiv.id = 'loading';
        document.body.appendChild(loadingDiv);

        fetch(`${apiUrl}/api/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player1,
                player2,
                points: generatedPoints
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayMatchResult(data, player1.name, player2.name);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error connecting to server. Make sure the server is running on port 3000');
            })
            .finally(() => {
                const loadingElement = document.getElementById('loading');
                if (loadingElement) {
                    loadingElement.remove();
                }
            });
    } catch (error) {
        console.error('Error simulating match:', error);
        alert('An error occurred while simulating the match. Please try again.');
    }
}

function displayMatchResult(data, player1Name, player2Name) {
    try {
        if (!data || !player1Name || !player2Name) {
            throw new Error('Invalid data received for match result');
        }

        const resultDiv = document.getElementById('matchResult');
        if (!resultDiv) {
            throw new Error('Match result element not found');
        }

        let html = `<h3>Match Result:</h3>`;
        html += `
          <div class="player-info">
            <p class="${data.winner === player1Name ? 'winner' : ''}">
              Player 1: ${player1Name} (Level: ${player1.level})
              ${data.winner === player1Name ? '🏆 WINNER!' : ''}
            </p>
            <p class="${data.winner === player2Name ? 'winner' : ''}">
              Player 2: ${player2Name} (Level: ${player2.level})
              ${data.winner === player2Name ? '🏆 WINNER!' : ''}
            </p>
          </div>
          ${data.winner
                ? `<p class="winner"><strong> Match Complete - ${data.winner} is victorious!</strong></p>`
                : `<p class="in-progress"><strong> Match in progress...</strong></p>`
            }`;

        html += `<table>
            <tr>
                <th>Player</th>`;

        const numSets = data.sets?.length || 0;
        for (let i = 0; i < numSets; i++) {
            html += `<th>Set ${i + 1}</th>`;
        }
        html += `<th>Current Game</th></tr>`;

        html += `<tr><td>${player1Name}</td>`;
        data.sets?.forEach(set => {
            html += `<td>${set[0]}</td>`;
        });
        html += `<td>${data.currentGame?.[0] || 0}</td></tr>`;

        html += `<tr><td>${player2Name}</td>`;
        data.sets?.forEach(set => {
            html += `<td>${set[1]}</td>`;
        });
        html += `<td>${data.currentGame?.[1] || 0}</td></tr>`;

        html += `</table>`;

        resultDiv.innerHTML = html;
    } catch (error) {
        console.error('Error displaying match result:', error);
        alert('An error occurred while displaying the match result. Please try again.');
    }
}
