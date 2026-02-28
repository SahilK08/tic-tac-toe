from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from game_logic import get_computer_move

app = FastAPI()

# Allow CORS for the Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BoardState(BaseModel):
    board: list[str]

@app.post("/computer_move")
async def computer_move(state: BoardState):
    move = get_computer_move(state.board)
    return {"move": move}
