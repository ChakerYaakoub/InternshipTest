# Tennis Match Simulator

A real-time tennis match simulation application with a Node.js/Express backend and web frontend.

## Description

This application simulates tennis matches, following standard tennis scoring rules and providing real-time updates of the game progress.

## Demo video

[Watch Demo Video](https://drive.google.com/file/d/18xrd_SArXGJPklzSYkjcCea4-naugJKe/view?usp=sharing)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation | Running

1- Clone the repository

2- Install backend dependencies:

```
cd backend
npm install
```

3- Running the Application Backend

##### Development Mode

```
npm run dev
```

This will start the server using nodemon, which automatically restarts when file changes are detected.

##### Production Mode

```
npm start
```

## Project Structure

```
backend/
├── server.ts # Main server file
├── package.json # Project dependencies and scripts
└── .gitignore # Git ignore rules
frontend/
├── index.html # Main HTML file
├── script.js # Frontend JavaScript
└── styles.css # Styling
```

## API Endpoints

- `GET /api/match/start` - Start a new match
- `GET /api/match/status` - Get current match status
- More endpoints to be documented...

## Technologies Used

- TypeScript
- Node.js
- Express.js
- CORS

## License

This project is licensed under the MIT License - see the LICENSE file for details.
