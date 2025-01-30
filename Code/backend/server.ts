import express from "express";
import { Request, Response } from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Types
interface Player {
  name: string;
  level: number;
}

interface MatchState {
  sets: number[][];
  currentGame: string[];
  winner: string | null;
}

// Tennis scoring logic
class TennisMatch {
  private player1: Player;
  private player2: Player;
  private sets: number[][] = [];
  private currentSet = 0;
  private currentGamePoints = [0, 0];
  private isTiebreak = false;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    // Initialize first set
    this.sets[0] = [0, 0];
  }

  private getGameScore(): string[] {
    if (this.isTiebreak) {
      return [
        this.currentGamePoints[0].toString(),
        this.currentGamePoints[1].toString(),
      ];
    }

    const scoreNotation = ["0", "15", "30", "40"];

    if (this.currentGamePoints[0] >= 3 && this.currentGamePoints[1] >= 3) {
      if (this.currentGamePoints[0] === this.currentGamePoints[1]) {
        return ["40", "40"];
      } else if (this.currentGamePoints[0] > this.currentGamePoints[1]) {
        return ["AV", "-"];
      } else {
        return ["-", "AV"];
      }
    }

    return [
      scoreNotation[Math.min(this.currentGamePoints[0], 3)],
      scoreNotation[Math.min(this.currentGamePoints[1], 3)],
    ];
  }

  private isSetComplete(): boolean {
    const set = this.sets[this.currentSet];
    if (!set) return false; // Return false if set doesn't exist

    const diff = Math.abs(set[0] - set[1]);
    const max = Math.max(set[0], set[1]);

    // Set is won by 6 games with 2+ game difference
    if (max >= 6 && diff >= 2) return true;

    // Set is won by 7-6 after tiebreak
    if (max === 7 && (set[0] === 7 || set[1] === 7)) return true;

    return false;
  }

  private processGame(winner: number) {
    if (this.isTiebreak) {
      this.currentGamePoints[winner]++;
      if (
        this.currentGamePoints[winner] >= 7 &&
        this.currentGamePoints[winner] - this.currentGamePoints[1 - winner] >= 2
      ) {
        // Win tiebreak and set
        this.sets[this.currentSet][winner]++;
        this.currentGamePoints = [0, 0];
        this.isTiebreak = false;

        // Move to next set
        this.currentSet++;
        if (this.currentSet < 5) {
          this.sets[this.currentSet] = [0, 0];
        }
      }
    } else {
      this.currentGamePoints[winner]++;

      // Check if game is won
      if (
        this.currentGamePoints[winner] >= 4 &&
        this.currentGamePoints[winner] - this.currentGamePoints[1 - winner] >= 2
      ) {
        // Win game
        this.sets[this.currentSet][winner]++;
        this.currentGamePoints = [0, 0];

        // Check if set is complete
        if (this.isSetComplete()) {
          this.currentSet++;
          if (this.currentSet < 5) {
            this.sets[this.currentSet] = [0, 0];
          }
        }
        // Check for tiebreak
        else if (
          this.sets[this.currentSet][0] === 6 &&
          this.sets[this.currentSet][1] === 6
        ) {
          this.isTiebreak = true;
        }
      }
    }
  }

  public processPoint(point: number) {
    if (this.currentSet < 5) {
      this.processGame(point);
    }
  }

  public getState(): MatchState {
    const setsWon = [0, 0];
    // Only check sets up to the current set
    for (let i = 0; i < this.currentSet; i++) {
      const set = this.sets[i];
      if (set) {
        // Make sure the set exists
        if (set[0] > set[1]) setsWon[0]++;
        else if (set[1] > set[0]) setsWon[1]++;
      }
    }

    let winner = null;
    if (setsWon[0] >= 3) winner = this.player1.name;
    if (setsWon[1] >= 3) winner = this.player2.name;

    // Filter out undefined sets
    const validSets = this.sets.filter((set) => set !== undefined);

    return {
      sets: validSets,
      currentGame: this.getGameScore(),
      winner,
    };
  }
}

// Routes
app.post("/api/match", (req: Request, res: Response) => {
  const { player1, player2, points } = req.body;

  const match = new TennisMatch(player1, player2);

  points.forEach((point: number) => {
    match.processPoint(point);
  });

  res.json(match.getState());
});

// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
