# Tic-Tac-Toe: Next Generation

A visually stunning, full-stack Tic-Tac-Toe web application. Experience smooth glassmorphism aesthetics, responsive mobile design, and an integrated AI opponent!

## ✨ Features

- **Two Play Modes**:
  - `👤 vs 👤`: Play locally against a friend on the same device.
  - `👤 vs 🤖`: Test your skills against an integrated AI opponent.
- **Smart AI Opponent**: The computer doesn't just play randomly! It is programmed to:
  - Recognize and take immediate winning moves.
  - Actively block the player when they are one move away from winning.
  - Prioritize the center square.
  - Defend against advanced "double-threat" corner traps.
- **Premium Aesthetics**:
  - Deep dark mode gradient background.
  - Frosted-glass (glassmorphism) UI panels.
  - Neon hover effects, smooth CSS animations, and satisfying click interactions.
- **Fully Responsive**: Fluid layout design ensures the game looks and plays perfectly on desktop monitors and mobile phone screens.

## 🛠️ Tech Stack

### Frontend
* **React 19** bootstrapped with **Vite** for lightning-fast hot module replacement.
* **Vanilla CSS** utilizing modern layout features (CSS Grid, flexbox, clamp(), aspect-ratio) to create a fully responsive, framework-agnostic presentation.
* `concurrently` package used for streamlined local development.

### Backend
* **Python 3.12** running **FastAPI**.
* **Uvicorn** ASGI server.
* Game logic algorithm written in pure Python.

## 🚀 How to Run Locally

You only need one terminal instance and one command to start **both** the frontend and the backend! We use the package `concurrently` to tie the services together.

### Prerequisites
Make sure you have Node.js and Python installed on your system.

### 1. Initial Setup
First, clone or download the repository, then install the frontend modules and setup the python virtual environment.

```bash
# Navigate to the frontend folder and install JS dependencies
cd frontend
npm install

# Navigate to the backend folder and setup Python
cd ../backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Start the Application
Go back to the `frontend` folder and run the developer script:

```bash
cd ../frontend
npm run dev
```

This single command will:
1. Start the **Vite React Server** on `http://localhost:5173`.
2. Automatically activate the backend virtual environment, and start the **FastAPI Uvicorn Server** on `http://127.0.0.1:8000`.

Open `http://localhost:5173` in your browser and enjoy the game!

## 📁 Project Structure

```text
Tic-Tac-Toe/
├── backend/
│   ├── main.py              # FastAPI server endpoints
│   ├── game_logic.py        # Python AI bot logic
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── package.json         # Node scripts & 'concurrently' runner
│   ├── src/                 # React UI Components and CSS
│   └── index.html           # Vite entry HTML
└── README.md
```
