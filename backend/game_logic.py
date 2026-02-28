import random

def check_win(board, player):
    win_lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], # cols
        [0, 4, 8], [2, 4, 6]             # diagonals
    ]
    for line in win_lines:
        if board[line[0]] == board[line[1]] == board[line[2]] == player:
            return True
    return False

def get_computer_move(board: list[str]) -> int:
    """
    Returns an available move (index 0-8) based on the board state.
    Uses basic AI: 
    1. Win if possible
    2. Block player if player can win
    3. Center if available
    4. Random available space
    """
    available_moves = [i for i, cell in enumerate(board) if cell == ""]
    if not available_moves:
        return -1

    # 1. Can the computer (O) win in the next move?
    for move in available_moves:
        board_copy = list(board)
        board_copy[move] = "O"
        if check_win(board_copy, "O"):
            return move

    # 2. Can the player (X) win in the next move? Block them!
    for move in available_moves:
        board_copy = list(board)
        board_copy[move] = "X"
        if check_win(board_copy, "X"):
            return move
            
    # 3. Take the center if available
    if 4 in available_moves:
        return 4

    # 4. Prevent corner traps. If player has two opposite corners and we have the center, 
    # we must play an edge (1, 3, 5, 7) to force them to block, rather than a corner 
    # which would give them a double-threat.
    if board[4] == "O":
        # Check opposite corners for "X"
        if (board[0] == "X" and board[8] == "X") or (board[2] == "X" and board[6] == "X"):
            # Play a random available edge
            edges = [1, 3, 5, 7]
            available_edges = [e for e in edges if e in available_moves]
            if available_edges:
                return random.choice(available_edges)

    # 5. Otherwise, pick a random available move
    # (Preferring corners if available is generally a better basic strategy than pure random)
    corners = [0, 2, 6, 8]
    available_corners = [c for c in corners if c in available_moves]
    if available_corners:
        return random.choice(available_corners)

    return random.choice(available_moves)
