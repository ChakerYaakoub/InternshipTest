const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.post('/calculate-score', (req, res) => {
    const { points, player1, player2 } = req.body;
    const score = calculateScore(points, player1, player2);
    res.json(score);
});

function calculateScore(points, player1, player2) {
    let score = {
        winner: null,
        player1Name: player1.name,
        player2Name: player2.name,
        sets: [
            { player1: 0, player2: 0, games: [] },
            { player1: 0, player2: 0, games: [] },
            { player1: 0, player2: 0, games: [] },
            { player1: 0, player2: 0, games: [] },
            { player1: 0, player2: 0, games: [] }
        ],
        currentGame: { player1: 0, player2: 0 }
    };

    let currentSet = 0;
    let currentGamePoints = { player1: 0, player2: 0 };

    points.forEach(point => {
        const winner = point === player1.name ? 'player1' : 'player2';
        currentGamePoints[winner]++;

        // Check if game is won
        if (isGameWon(currentGamePoints)) {
            score.sets[currentSet][winner]++;
            currentGamePoints = { player1: 0, player2: 0 };

            // Check if set is won
            if (isSetWon(score.sets[currentSet])) {
                currentSet++;
                if (currentSet === 5 || countSetsWon(score, player1.name) === 3 ||
                    countSetsWon(score, player2.name) === 3) {
                    score.winner = winner === 'player1' ? player1.name : player2.name;
                }
            }
        }
    });

    score.currentGame = formatGameScore(currentGamePoints);
    return score;
}

function isGameWon(points) {
    return (points.player1 >= 4 && points.player1 >= points.player2 + 2) ||
        (points.player2 >= 4 && points.player2 >= points.player1 + 2);
}

function isSetWon(set) {
    return (set.player1 >= 6 && set.player1 >= set.player2 + 2) ||
        (set.player2 >= 6 && set.player2 >= set.player1 + 2) ||
        (set.player1 === 7 && set.player2 === 6) ||
        (set.player2 === 7 && set.player1 === 6);
}

function formatGameScore(points) {
    const scores = ['0', '15', '30', '40'];

    if (points.player1 >= 3 && points.player2 >= 3) {
        if (points.player1 === points.player2) return { player1: '40', player2: '40' };
        if (points.player1 > points.player2) return { player1: 'AV', player2: '-' };
        return { player1: '-', player2: 'AV' };
    }

    return {
        player1: points.player1 < 4 ? scores[points.player1] : 'AV',
        player2: points.player2 < 4 ? scores[points.player2] : 'AV'
    };
}

function countSetsWon(score, playerName) {
    return score.sets.filter(set => {
        if (set.player1 > set.player2) return playerName === score.player1Name;
        if (set.player2 > set.player1) return playerName === score.player2Name;
        return false;
    }).length;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 